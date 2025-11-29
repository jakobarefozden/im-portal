package main

import (
	"net/http"

	"encoding/json"

	"github.com/go-chi/chi/v5"
)

func apiRouter(repo *Repository, adminToken string) http.Handler {
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

	// 🔐 Admin routes
	r.Route("/admin", func(ar chi.Router) {
		ar.Use(adminAuthMiddleware(adminToken))

		// Subtheme create/update
		ar.Post("/subthemes", func(w http.ResponseWriter, r *http.Request) {
			handleUpsertSubTheme(w, r, repo)
		})
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

type SubThemeUpsertRequest struct {
	ClassID   string   `json:"classId"`
	CourseID  string   `json:"courseId"`
	ThemeID   string   `json:"themeId"`
	ID        string   `json:"id"`
	Title     string   `json:"title"`
	ShortDesc string   `json:"shortDescription"`
	Desc      string   `json:"description"`
	NotePDF   string   `json:"notePdf"`
	TasksPDF  string   `json:"tasksPdf"`
	FormURL   string   `json:"formUrl"`
	Images    []string `json:"images"`
}

func handleUpsertSubTheme(w http.ResponseWriter, r *http.Request, repo *Repository) {
	var req SubThemeUpsertRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json")
		return
	}

	if req.ClassID == "" || req.CourseID == "" || req.ThemeID == "" || req.ID == "" {
		writeError(w, http.StatusBadRequest, "classId, courseId, themeId and id are required")
		return
	}

	st := SubTheme{
		ID:               req.ID,
		Title:            req.Title,
		ShortDescription: req.ShortDesc,
		Description:      req.Desc,
		NotePDF:          req.NotePDF,
		TasksPDF:         req.TasksPDF,
		FormURL:          req.FormURL,
		Images:           req.Images,
	}

	if err := repo.UpsertSubTheme(req.ClassID, req.CourseID, req.ThemeID, &st); err != nil {
		writeError(w, http.StatusInternalServerError, "could not save subtheme")
		return
	}

	// Kayıt sonrası güncel halini döndür
	saved, err := repo.GetSubTheme(req.ClassID, req.CourseID, req.ThemeID, req.ID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "saved but could not reload")
		return
	}

	writeJSON(w, http.StatusOK, saved)
}

func adminAuthMiddleware(adminToken string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if adminToken == "" {
				writeError(w, http.StatusServiceUnavailable, "admin API not configured")
				return
			}

			token := r.Header.Get("X-Admin-Token")
			if token == "" || token != adminToken {
				writeError(w, http.StatusUnauthorized, "unauthorized")
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
