import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClassById, getCourse } from "../api/content";

function CoursePage() {
  const { classId, courseId } = useParams();

  const [cls, setCls] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // Hem class hem course'u paralel çekelim
    Promise.all([getClassById(classId), getCourse(classId, courseId)])
      .then(([classData, courseData]) => {
        if (isMounted) {
          setCls(classData);
          setCourse(courseData);
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
  }, [classId, courseId]);

  if (loading) {
    return <p>Laster fag...</p>;
  }

  if (error) {
    return (
      <div>
        <h2>Feil ved lasting av fag</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!cls || !course) {
    return (
      <div>
        <h2>Fag ikke funnet</h2>
        <p>Vi fant ikke dette faget.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{course.title}</h2>
      <p>
        <strong>{cls.code}</strong> – {cls.name}
      </p>
      <p>{course.shortDescription}</p>

      {course.ndlaUrl && (
        <p>
          NDLA:{" "}
          <a href={course.ndlaUrl} target="_blank" rel="noreferrer">
            Åpne NDLA-side
          </a>
        </p>
      )}

      <h3>Temaer i dette faget</h3>
      {course.themes && course.themes.length > 0 ? (
        <ul>
          {course.themes.map((theme) => (
            <li key={theme.id}>
              <strong>{theme.title}</strong> – {theme.shortDescription}
              <br />
              <Link
                to={`/theme/${cls.id}/${course.id}/${theme.id}`}
                className="link-as-button"
              >
                Åpne temaside
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ingen temaer registrert ennå.</p>
      )}

      <p style={{ marginTop: "1rem" }}>
        <Link to={`/class/${cls.id}`} className="link-as-button">
          ← Tilbake til {cls.code}
        </Link>
      </p>
    </div>
  );
}

export default CoursePage;
