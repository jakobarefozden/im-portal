package main

import (
	"net/http"

	"encoding/json"

	"github.com/go-chi/chi/v5"
)

func apiRouter(repo *Repository) http.Handler {
	r := chi.NewRouter()

	r.Get("/classes", func(w http.ResponseWriter, r *http.Request) {
		handleGetClasses(w, r, repo)
	})
	r.Get("/classes/{classID}", func(w http.ResponseWriter, r *http.Request) {
		handleGetClass(w, r, repo)
	})

	r.Get("/courses/{classID}/{courseID}", func(w http.ResponseWriter, r *http.Request) {
		handleGetCourse(w, r, repo)
	})
	r.Get("/themes/{classID}/{courseID}/{themeID}", func(w http.ResponseWriter, r *http.Request) {
		handleGetTheme(w, r, repo)
	})
	r.Get("/subthemes/{classID}/{courseID}/{themeID}/{subID}", func(w http.ResponseWriter, r *http.Request) {
		handleGetSubTheme(w, r, repo)
	})

	return r
}

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{
		"error": message,
	})
}

func handleGetClasses(w http.ResponseWriter, r *http.Request, repo *Repository) {
	classes, err := repo.GetClasses()
	if err != nil {
		writeError(w, http.StatusInternalServerError, "could not load classes")
		return
	}
	writeJSON(w, http.StatusOK, classes)
}

func handleGetClass(w http.ResponseWriter, r *http.Request, repo *Repository) {
	classID := chi.URLParam(r, "classID")
	cls, err := repo.GetClass(classID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "could not load class")
		return
	}
	if cls == nil {
		writeError(w, http.StatusNotFound, "class not found")
		return
	}
	writeJSON(w, http.StatusOK, cls)
}

func handleGetCourse(w http.ResponseWriter, r *http.Request, repo *Repository) {
	classID := chi.URLParam(r, "classID")
	courseID := chi.URLParam(r, "courseID")

	course, err := repo.GetCourse(classID, courseID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "could not load course")
		return
	}
	if course == nil {
		writeError(w, http.StatusNotFound, "course not found")
		return
	}
	writeJSON(w, http.StatusOK, course)
}

func handleGetTheme(w http.ResponseWriter, r *http.Request, repo *Repository) {
	classID := chi.URLParam(r, "classID")
	courseID := chi.URLParam(r, "courseID")
	themeID := chi.URLParam(r, "themeID")

	theme, err := repo.GetTheme(classID, courseID, themeID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "could not load theme")
		return
	}
	if theme == nil {
		writeError(w, http.StatusNotFound, "theme not found")
		return
	}
	writeJSON(w, http.StatusOK, theme)
}

func handleGetSubTheme(w http.ResponseWriter, r *http.Request, repo *Repository) {
	classID := chi.URLParam(r, "classID")
	courseID := chi.URLParam(r, "courseID")
	themeID := chi.URLParam(r, "themeID")
	subID := chi.URLParam(r, "subID")

	sub, err := repo.GetSubTheme(classID, courseID, themeID, subID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "could not load subtheme")
		return
	}
	if sub == nil {
		writeError(w, http.StatusNotFound, "subtheme not found")
		return
	}
	writeJSON(w, http.StatusOK, sub)
}
