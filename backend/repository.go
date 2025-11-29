package main

import (
	"database/sql"
	"fmt"
	"os"
)

// Repository tüm DB erişimini kapsar
type Repository struct {
	DB *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{DB: db}
}

// Migration: 001_init.sql dosyasını çalıştır
func (r *Repository) RunMigrations() error {
	sqlBytes, err := os.ReadFile("migrations/001_init.sql")
	if err != nil {
		return fmt.Errorf("read migration: %w", err)
	}

	_, err = r.DB.Exec(string(sqlBytes))
	if err != nil {
		return fmt.Errorf("exec migration: %w", err)
	}

	return nil
}

// GetClasses: tüm sınıfları, iç içe courses/themes/subthemes ile döndür
func (r *Repository) GetClasses() ([]Class, error) {
	// Önce tüm classes
	rows, err := r.DB.Query(`SELECT id, code, name, description FROM classes ORDER BY id`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var classes []Class

	for rows.Next() {
		var cls Class
		if err := rows.Scan(&cls.ID, &cls.Code, &cls.Name, &cls.Description); err != nil {
			return nil, err
		}

		// Bu class'ın courses'larını çek
		courses, err := r.getCoursesForClass(cls.ID)
		if err != nil {
			return nil, err
		}
		cls.Courses = courses

		classes = append(classes, cls)
	}

	return classes, nil
}

// Tek Class (içinde courses/themes/subthemes ile)
func (r *Repository) GetClass(id string) (*Class, error) {
	row := r.DB.QueryRow(`SELECT id, code, name, description FROM classes WHERE id = ?`, id)

	var cls Class
	if err := row.Scan(&cls.ID, &cls.Code, &cls.Name, &cls.Description); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	courses, err := r.getCoursesForClass(cls.ID)
	if err != nil {
		return nil, err
	}
	cls.Courses = courses

	return &cls, nil
}

func (r *Repository) getCoursesForClass(classID string) ([]Course, error) {
	rows, err := r.DB.Query(`
		SELECT id, title, short_description, ndla_url
		FROM courses
		WHERE class_id = ?
		ORDER BY id`, classID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var courses []Course

	for rows.Next() {
		var c Course
		if err := rows.Scan(&c.ID, &c.Title, &c.ShortDescription, &c.NdlaURL); err != nil {
			return nil, err
		}

		themes, err := r.getThemesForCourse(classID, c.ID)
		if err != nil {
			return nil, err
		}
		c.Themes = themes

		courses = append(courses, c)
	}

	return courses, nil
}

// Tek Course
func (r *Repository) GetCourse(classID, courseID string) (*Course, error) {
	row := r.DB.QueryRow(`
		SELECT id, title, short_description, ndla_url
		FROM courses
		WHERE class_id = ? AND id = ?`,
		classID, courseID,
	)

	var c Course
	if err := row.Scan(&c.ID, &c.Title, &c.ShortDescription, &c.NdlaURL); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	themes, err := r.getThemesForCourse(classID, c.ID)
	if err != nil {
		return nil, err
	}
	c.Themes = themes

	return &c, nil
}

func (r *Repository) getThemesForCourse(classID, courseID string) ([]Theme, error) {
	rows, err := r.DB.Query(`
		SELECT id, title, short_description
		FROM themes
		WHERE class_id = ? AND course_id = ?
		ORDER BY id`,
		classID, courseID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var themes []Theme

	for rows.Next() {
		var t Theme
		if err := rows.Scan(&t.ID, &t.Title, &t.ShortDescription); err != nil {
			return nil, err
		}

		subthemes, err := r.getSubThemesForTheme(classID, courseID, t.ID)
		if err != nil {
			return nil, err
		}
		t.SubThemes = subthemes

		themes = append(themes, t)
	}

	return themes, nil
}

// Tek Theme
func (r *Repository) GetTheme(classID, courseID, themeID string) (*Theme, error) {
	row := r.DB.QueryRow(`
		SELECT id, title, short_description
		FROM themes
		WHERE class_id = ? AND course_id = ? AND id = ?`,
		classID, courseID, themeID,
	)

	var t Theme
	if err := row.Scan(&t.ID, &t.Title, &t.ShortDescription); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	subthemes, err := r.getSubThemesForTheme(classID, courseID, t.ID)
	if err != nil {
		return nil, err
	}
	t.SubThemes = subthemes

	return &t, nil
}

func (r *Repository) getSubThemesForTheme(classID, courseID, themeID string) ([]SubTheme, error) {
	rows, err := r.DB.Query(`
		SELECT id, title, short_description, description, note_pdf, tasks_pdf, form_url
		FROM subthemes
		WHERE class_id = ? AND course_id = ? AND theme_id = ?
		ORDER BY id`,
		classID, courseID, themeID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var subs []SubTheme

	for rows.Next() {
		var s SubTheme
		if err := rows.Scan(
			&s.ID,
			&s.Title,
			&s.ShortDescription,
			&s.Description,
			&s.NotePDF,
			&s.TasksPDF,
			&s.FormURL,
		); err != nil {
			return nil, err
		}

		// Şimdilik resim verisini DB'de tutmuyoruz
		s.Images = []string{}

		subs = append(subs, s)
	}

	return subs, nil
}

// Tek SubTheme
func (r *Repository) GetSubTheme(classID, courseID, themeID, subID string) (*SubTheme, error) {
	row := r.DB.QueryRow(`
		SELECT id, title, short_description, description, note_pdf, tasks_pdf, form_url
		FROM subthemes
		WHERE class_id = ? AND course_id = ? AND theme_id = ? AND id = ?`,
		classID, courseID, themeID, subID,
	)

	var s SubTheme
	if err := row.Scan(
		&s.ID,
		&s.Title,
		&s.ShortDescription,
		&s.Description,
		&s.NotePDF,
		&s.TasksPDF,
		&s.FormURL,
	); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	s.Images = []string{}

	return &s, nil
}

func (r *Repository) UpsertSubTheme(classID, courseID, themeID string, st *SubTheme) error {
	// Images şu an DB'de yok, sadece alan olarak kalıyor
	_, err := r.DB.Exec(`
        INSERT INTO subthemes (
            id, theme_id, course_id, class_id,
            title, short_description, description,
            note_pdf, tasks_pdf, form_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id, theme_id, course_id, class_id)
        DO UPDATE SET
            title = excluded.title,
            short_description = excluded.short_description,
            description = excluded.description,
            note_pdf = excluded.note_pdf,
            tasks_pdf = excluded.tasks_pdf,
            form_url = excluded.form_url
    `,
		st.ID,
		themeID,
		courseID,
		classID,
		st.Title,
		st.ShortDescription,
		st.Description,
		st.NotePDF,
		st.TasksPDF,
		st.FormURL,
	)
	return err
}
