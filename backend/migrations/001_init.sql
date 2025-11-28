-- classes tablosu
CREATE TABLE IF NOT EXISTS classes (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT
);

-- courses tablosu
CREATE TABLE IF NOT EXISTS courses (
    id TEXT NOT NULL,
    class_id TEXT NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT,
    ndla_url TEXT,
    PRIMARY KEY (id, class_id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- themes tablosu
CREATE TABLE IF NOT EXISTS themes (
    id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    class_id TEXT NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT,
    PRIMARY KEY (id, course_id, class_id),
    FOREIGN KEY (course_id, class_id) REFERENCES courses(id, class_id)
);

-- subthemes tablosu
CREATE TABLE IF NOT EXISTS subthemes (
    id TEXT NOT NULL,
    theme_id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    class_id TEXT NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT,
    description TEXT,
    note_pdf TEXT,
    tasks_pdf TEXT,
    form_url TEXT,
    PRIMARY KEY (id, theme_id, course_id, class_id),
    FOREIGN KEY (theme_id, course_id, class_id) REFERENCES themes(id, course_id, class_id)
);

-- Basit örnek veriler (IM Vg1, Teknologiforståelse, Digital teknologi + Datasikkerhet)

INSERT OR IGNORE INTO classes (id, code, name, description) VALUES
('im-vg1', 'IM Vg1', 'IM Vg1 – Felles programfag', 'VG1 Informasjonsteknologi og medieproduksjon – felles programfag.'),
('it-vg2', 'IT Vg2', 'Informasjonsteknologi Vg2', 'Brukerstøtte, driftsstøtte og utvikling for IT-systemer og nettverk.'),
('mp-vg2', 'MP Vg2', 'Medieproduksjon Vg2', 'Design, kommunikasjon og produksjon for ulike mediekanaler.');

INSERT OR IGNORE INTO courses (id, class_id, title, short_description, ndla_url) VALUES
('teknologiforstaelse', 'im-vg1', 'Teknologiforståelse', 'Hvordan digitale systemer fungerer, og hvordan vi bruker dem trygt.', 'https://ndla.no/f/teknologiforstaelse-im-ikm-vg1/087c23101fc5');

INSERT OR IGNORE INTO themes (id, course_id, class_id, title, short_description) VALUES
('digital-teknologi', 'teknologiforstaelse', 'im-vg1', 'Digital teknologi', 'Grunnleggende om maskinvare, programvare og binære tall.'),
('datasikkerhet', 'teknologiforstaelse', 'im-vg1', 'Datasikkerhet', 'Trusler mot datasikkerhet og hvordan vi beskytter oss.');

INSERT OR IGNORE INTO subthemes (id, theme_id, course_id, class_id, title, short_description, description, note_pdf, tasks_pdf, form_url) VALUES
('maskinvare-grunnleggende', 'digital-teknologi', 'teknologiforstaelse', 'im-vg1',
 'Maskinvare – det fysiske i datamaskinen',
 'CPU, RAM, lagring og hovedkort – hva gjør de egentlig?',
 'I denne underdelen ser vi på de viktigste komponentene i en datamaskin og hvordan de samarbeider.',
 '/static/pdf/im-vg1/teknologiforstaelse/maskinvare-notat.pdf',
 '/static/pdf/im-vg1/teknologiforstaelse/maskinvare-oppgaver.pdf',
 ''
),
('passord-tofaktor', 'datasikkerhet', 'teknologiforstaelse', 'im-vg1',
 'Passord og tofaktor',
 'Hva er et sterkt passord, og hvorfor er tofaktor viktig?',
 'I denne delen jobber vi med gode passordvaner, passord-manager og tofaktor-autentisering.',
 '/static/pdf/im-vg1/teknologiforstaelse/datasikkerhet-passord-notat.pdf',
 '/static/pdf/im-vg1/teknologiforstaelse/datasikkerhet-passord-oppgaver.pdf',
 ''
);
