package main

// Şimdilik sadece çok küçük bir subset. Sonra DB'den alacağız.
var classesData = []Class{
	{
		ID:          "im-vg1",
		Code:        "IM Vg1",
		Name:        "IM Vg1 – Felles programfag",
		Description: "VG1 Informasjonsteknologi og medieproduksjon – felles programfag.",
		Courses: []Course{
			{
				ID:               "teknologiforstaelse",
				Title:            "Teknologiforståelse",
				ShortDescription: "Hvordan digitale systemer fungerer, og hvordan vi bruker dem trygt.",
				NdlaURL:          "https://ndla.no/f/teknologiforstaelse-im-ikm-vg1/087c23101fc5",
				Themes: []Theme{
					{
						ID:               "digital-teknologi",
						Title:            "Digital teknologi",
						ShortDescription: "Grunnleggende om maskinvare, programvare og binære tall.",
						SubThemes: []SubTheme{
							{
								ID:               "maskinvare-grunnleggende",
								Title:            "Maskinvare – det fysiske i datamaskinen",
								ShortDescription: "CPU, RAM, lagring og hovedkort – hva gjør de egentlig?",
								Description:      "I denne underdelen ser vi på de viktigste komponentene i en datamaskin og hvordan de samarbeider.",
								NotePDF:          "/static/pdf/im-vg1/teknologiforstaelse/maskinvare-notat.pdf",
								TasksPDF:         "/static/pdf/im-vg1/teknologiforstaelse/maskinvare-oppgaver.pdf",
								Images: []string{
									"/static/img/im-vg1/teknologiforstaelse/maskinvare-1.jpg",
								},
								FormURL: "",
							},
						},
					},
					{
						ID:               "datasikkerhet",
						Title:            "Datasikkerhet",
						ShortDescription: "Trusler mot datasikkerhet og hvordan vi beskytter oss.",
						SubThemes: []SubTheme{
							{
								ID:               "passord-tofaktor",
								Title:            "Passord og tofaktor",
								ShortDescription: "Sterke passord og ekstra beskyttelse med tofaktor.",
								Description:      "I denne delen jobber vi med gode passordvaner, passord-manager og tofaktor-autentisering.",
								NotePDF:          "/static/pdf/im-vg1/teknologiforstaelse/datasikkerhet-passord-notat.pdf",
								TasksPDF:         "/static/pdf/im-vg1/teknologiforstaelse/datasikkerhet-passord-oppgaver.pdf",
								Images: []string{
									"/static/img/im-vg1/teknologiforstaelse/passord-1.png",
								},
								FormURL: "",
							},
						},
					},
				},
			},
		},
	},
	{
		ID:          "it-vg2",
		Code:        "IT Vg2",
		Name:        "Informasjonsteknologi Vg2",
		Description: "Brukerstøtte, driftsstøtte og utvikling for IT-systemer og nettverk.",
		Courses:     []Course{},
	},
	{
		ID:          "mp-vg2",
		Code:        "MP Vg2",
		Name:        "Medieproduksjon Vg2",
		Description: "Design, kommunikasjon og produksjon for ulike mediekanaler.",
		Courses:     []Course{},
	},
}

// Yardımcı bul fonksiyonları

func findClass(id string) *Class {
	for i := range classesData {
		if classesData[i].ID == id {
			return &classesData[i]
		}
	}
	return nil
}

func findCourse(classID, courseID string) *Course {
	cls := findClass(classID)
	if cls == nil {
		return nil
	}
	for i := range cls.Courses {
		if cls.Courses[i].ID == courseID {
			return &cls.Courses[i]
		}
	}
	return nil
}

func findTheme(classID, courseID, themeID string) *Theme {
	course := findCourse(classID, courseID)
	if course == nil {
		return nil
	}
	for i := range course.Themes {
		if course.Themes[i].ID == themeID {
			return &course.Themes[i]
		}
	}
	return nil
}

func findSubTheme(classID, courseID, themeID, subID string) *SubTheme {
	theme := findTheme(classID, courseID, themeID)
	if theme == nil {
		return nil
	}
	for i := range theme.SubThemes {
		if theme.SubThemes[i].ID == subID {
			return &theme.SubThemes[i]
		}
	}
	return nil
}
