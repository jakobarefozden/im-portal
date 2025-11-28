import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClassById } from "../api/content";

function ClassPage() {
  const { classId } = useParams();

  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getClassById(classId)
      .then((data) => {
        if (isMounted) {
          setCls(data);
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
  }, [classId]);

  if (loading) {
    return <p>Laster trinn...</p>;
  }

  if (error) {
    return (
      <div>
        <h2>Feil ved lasting av trinn</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!cls) {
    return (
      <div>
        <h2>Ukjent trinn</h2>
        <p>Dette trinnet finnes ikke (path: {classId}).</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{cls.name}</h2>
      <p>{cls.description}</p>

      <h3>Felles programfag</h3>
      <ul>
        {cls.courses.map((course) => (
          <li key={course.id}>
            <strong>{course.title}</strong> – {course.shortDescription}
            <br />
            <Link
              to={`/course/${cls.id}/${course.id}`}
              className="link-as-button"
            >
              Åpne fag
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassPage;
