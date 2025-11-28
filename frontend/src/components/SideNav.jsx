import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClasses } from "../api/content";

function SideNav() {
  const location = useLocation();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL parçalama
  const segments = location.pathname.split("/").filter(Boolean);

  let activeClassId = null;
  let activeCourseId = null;
  let activeThemeId = null;

  if (segments[0] === "class") {
    activeClassId = segments[1];
  } else if (segments[0] === "course") {
    activeClassId = segments[1];
    activeCourseId = segments[2];
  } else if (segments[0] === "theme") {
    activeClassId = segments[1];
    activeCourseId = segments[2];
    activeThemeId = segments[3];
  } else if (segments[0] === "subtheme") {
    activeClassId = segments[1];
    activeCourseId = segments[2];
    activeThemeId = segments[3];
  }

  // classes'i API'den çek
  useEffect(() => {
    let isMounted = true;

    getClasses()
      .then((data) => {
        if (isMounted) {
          setClasses(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err);
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <aside className="side-nav">
        <p>Laster meny...</p>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="side-nav">
        <p>Kunne ikke laste menyen.</p>
        <small>{error}</small>
      </aside>
    );
  }

  const activeClass = classes.find((c) => c.id === activeClassId);
  const activeCourse = activeClass
    ? activeClass.courses.find((c) => c.id === activeCourseId)
    : null;

  return (
    <aside className="side-nav">
      <h3>Programområder</h3>
      <ul>
        {classes.map((cls) => (
          <li key={cls.id}>
            <Link
              to={`/class/${cls.id}`}
              className={
                activeClassId === cls.id
                  ? "side-nav__link side-nav__link--active"
                  : "side-nav__link"
              }
            >
              {cls.code}
            </Link>
          </li>
        ))}
      </ul>

      {activeClass && (
        <div className="side-nav__section">
          <h4>Fag på {activeClass.code}</h4>
          <ul>
            {activeClass.courses.map((course) => (
              <li key={course.id}>
                <Link
                  to={`/course/${activeClass.id}/${course.id}`}
                  className={
                    activeCourseId === course.id
                      ? "side-nav__link side-nav__link--active"
                      : "side-nav__link"
                  }
                >
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeCourse &&
        activeCourse.themes &&
        activeCourse.themes.length > 0 && (
          <div className="side-nav__section">
            <h4>Temaer i {activeCourse.title}</h4>
            <ul>
              {activeCourse.themes.map((theme) => (
                <li key={theme.id}>
                  <Link
                    to={`/theme/${activeClass.id}/${activeCourse.id}/${theme.id}`}
                    className={
                      activeThemeId === theme.id
                        ? "side-nav__link side-nav__link--active"
                        : "side-nav__link"
                    }
                  >
                    {theme.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
    </aside>
  );
}

export default SideNav;
