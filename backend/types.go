package main

// Alt tema (subtheme) – PDF'ler ve görseller burada
type SubTheme struct {
	ID               string   `json:"id"`
	Title            string   `json:"title"`
	ShortDescription string   `json:"shortDescription"`
	Description      string   `json:"description"`
	NotePDF          string   `json:"notePdf"`
	TasksPDF         string   `json:"tasksPdf"` // boş string = yok
	Images           []string `json:"images"`
	FormURL          string   `json:"formUrl"`
}

// Tema
type Theme struct {
	ID               string      `json:"id"`
	Title            string      `json:"title"`
	ShortDescription string      `json:"shortDescription"`
	SubThemes        []SubTheme  `json:"subthemes"`
}

// Ders (fag)
type Course struct {
	ID               string   `json:"id"`
	Title            string   `json:"title"`
	ShortDescription string   `json:"shortDescription"`
	NdlaURL          string   `json:"ndlaUrl"`
	Themes           []Theme  `json:"themes"`
}

// Programområde / trinn
type Class struct {
	ID          string   `json:"id"`
	Code        string   `json:"code"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Courses     []Course `json:"courses"`
}
