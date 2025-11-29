import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getClassById,
  getCourse,
  getTheme,
  getSubTheme,
} from "../api/content";
import { buildAssetUrl } from "../utils/url";



function SubThemePage() {
  const { classId, courseId, themeId, subId } = useParams();

  const [cls, setCls] = useState(null);
  const [course, setCourse] = useState(null);
  const [theme, setTheme] = useState(null);
  const [subtheme, setSubtheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      getClassById(classId),
      getCourse(classId, courseId),
      getTheme(classId, courseId, themeId),
      getSubTheme(classId, courseId, themeId, subId),
    ])
      .then(([classData, courseData, themeData, subData]) => {
        if (isMounted) {
          setCls(classData);
          setCourse(courseData);
          setTheme(themeData);
          setSubtheme(subData);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [classId, courseId, themeId, subId]);

  if (loading) return <p>Laster under-tema...</p>;

  if (error) {
    return (
      <div>
        <h2>Feil ved lasting av under-tema</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!cls || !course || !theme || !subtheme) {
    return (
      <div>
        <h2>Under-tema ikke funnet</h2>
        <p>Vi fant ikke dette under-temaet.</p>
      </div>
    );
  }

  const images = subtheme.images || [];

  return (
    <div>
      <h2>{subtheme.title}</h2>
      <p>
        <strong>{cls.code}</strong> – {course.title} → {theme.title}
      </p>

      {subtheme.description && (
        <p style={{ marginTop: "0.75rem" }}>{subtheme.description}</p>
      )}

      {images.length > 0 && (
        <>
          <h3 style={{ marginTop: "1.25rem" }}>Bilder</h3>
          <div className="image-grid">
            {images.map((src) => (
              <div key={src} className="image-grid__item">
                <img src={buildAssetUrl(src)} alt={subtheme.title} />
              </div>
            ))}
          </div>
        </>
      )}

<h3 style={{ marginTop: "1.25rem" }}>Ressurser (PDF)</h3>
<ul>
  {subtheme.notePdf && (
    <li>
      <Link
        to={`/viewer?file=${encodeURIComponent(subtheme.notePdf)}`}
        className="link-as-button"
      >
        Åpne notater i visning
      </Link>
      {" "}
      <a
        href={buildAssetUrl(subtheme.notePdf)}
        target="_blank"
        rel="noreferrer"
        style={{ marginLeft: "0.5rem", fontSize: "0.9rem" }}
      >
        (Last ned)
      </a>
    </li>
  )}

  {subtheme.tasksPdf && (
    <li style={{ marginTop: "0.5rem" }}>
      <Link
        to={`/viewer?file=${encodeURIComponent(subtheme.tasksPdf)}`}
        className="link-as-button"
      >
        Åpne oppgaver i visning
      </Link>
      {" "}
      <a
        href={buildAssetUrl(subtheme.tasksPdf)}
        target="_blank"
        rel="noreferrer"
        style={{ marginLeft: "0.5rem", fontSize: "0.9rem" }}
      >
        (Last ned)
      </a>
    </li>
  )}

  {!subtheme.notePdf && !subtheme.tasksPdf && (
    <li>Ingen PDF-er registrert ennå.</li>
  )}
</ul>


      {subtheme.formUrl && subtheme.formUrl.trim() !== "" && (
        <>
          <h3 style={{ marginTop: "1.25rem" }}>Interaktiv oppgave</h3>
          <div className="form-embed">
            <iframe
              src={subtheme.formUrl}
              title="Microsoft Forms"
              loading="lazy"
            />
          </div>
        </>
      )}

      <p style={{ marginTop: "1.25rem" }}>
        <Link
          to={`/theme/${cls.id}/${course.id}/${theme.id}`}
          className="link-as-button"
        >
          ← Tilbake til tema
        </Link>
      </p>
    </div>
  );
}

export default SubThemePage;
