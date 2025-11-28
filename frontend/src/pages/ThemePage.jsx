import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClassById, getCourse, getTheme } from "../api/content";

function ThemePage() {
  const { classId, courseId, themeId } = useParams();

  const [cls, setCls] = useState(null);
  const [course, setCourse] = useState(null);
  const [theme, setTheme] = useState(null);
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
    ])
      .then(([classData, courseData, themeData]) => {
        if (isMounted) {
          setCls(classData);
          setCourse(courseData);
          setTheme(themeData);
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
  }, [classId, courseId, themeId]);

  if (loading) return <p>Laster tema...</p>;

  if (error) {
    return (
      <div>
        <h2>Feil ved lasting av tema</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!cls || !course || !theme) {
    return (
      <div>
        <h2>Tema ikke funnet</h2>
        <p>Vi fant ikke dette temaet.</p>
      </div>
    );
  }

  const subthemes = theme.subthemes || theme.SubThemes || [];

  return (
    <div>
      <h2>{theme.title}</h2>
      <p>
        <strong>{cls.code}</strong> – {course.title}
      </p>
      <p>{theme.shortDescription}</p>

      {subthemes.length > 0 && (
        <>
          <h3 style={{ marginTop: "1.25rem" }}>Under-temaer</h3>
          <ul>
            {subthemes.map((st) => (
              <li key={st.id}>
                <strong>{st.title}</strong> – {st.shortDescription}
                <br />
                <Link
                  to={`/subtheme/${cls.id}/${course.id}/${theme.id}/${st.id}`}
                  className="link-as-button"
                >
                  Åpne under-tema
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {subthemes.length === 0 && (
        <p style={{ marginTop: "1rem" }}>
          Det er foreløpig ikke registrert egne under-temaer her.
        </p>
      )}

      <p style={{ marginTop: "1rem" }}>
        <Link
          to={`/course/${cls.id}/${course.id}`}
          className="link-as-button"
        >
          ← Tilbake til faget
        </Link>
      </p>
    </div>
  );
}

export default ThemePage;
