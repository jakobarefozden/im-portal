package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "modernc.org/sqlite"
)

func main() {
	// DB'yi aç
	if err := os.MkdirAll("db", 0755); err != nil {
		log.Fatalf("could not create db dir: %v", err)
	}

	db, err := sql.Open("sqlite", "db/content.db")
	if err != nil {
		log.Fatalf("could not open db: %v", err)
	}
	defer db.Close()

	// Repository + migration
	repo := NewRepository(db)
	if err := repo.RunMigrations(); err != nil {
		log.Fatalf("could not run migrations: %v", err)
	}

	r := chi.NewRouter()

	// Orta katmanlar (log, recovery vs.)
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// CORS
	r.Use(corsMiddleware)

	// Health check
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	// API router'a repo ver
	r.Mount("/api", apiRouter(repo))

	// Statik dosyalar (pdf, img) için:
	fileServer := http.FileServer(http.Dir("static"))
	r.Handle("/static/*", http.StripPrefix("/static", fileServer))

	// Port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	srv := &http.Server{
		Addr:         ":" + port,
		Handler:      r,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	log.Printf("Server listening on http://localhost:%s", port)
	log.Fatal(srv.ListenAndServe())
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		origin := r.Header.Get("Origin")

		// Eğer isteğin Origin’i GitHub Pages ise izin ver
		if origin == "https://jakobarefozden.github.io" ||
			origin == "https://www.jakobarefozden.github.io" ||
			origin == "http://localhost:5173" {

			w.Header().Set("Access-Control-Allow-Origin", origin)
		}

		// Gereken header'lar
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Vary", "Origin")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
