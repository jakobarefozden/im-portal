import { NavLink } from "react-router-dom";

function TopNav() {
  const baseClass = "top-nav__link";

  const linkClass = ({ isActive }) =>
    isActive ? `${baseClass} ${baseClass}--active` : baseClass;

  return (
    <nav className="top-nav">
      <NavLink to="" className={linkClass} end>
        Hjem
      </NavLink>
      <NavLink to="/class/im-vg1" className={linkClass}>
        IM Vg1
      </NavLink>
      <NavLink to="/class/it-vg2" className={linkClass}>
        IT Vg2
      </NavLink>
      <NavLink to="/class/mp-vg2" className={linkClass}>
        MP Vg2
      </NavLink>
      <NavLink to="/blog" className={linkClass}>
        Blog
      </NavLink>
    </nav>
  );
}

export default TopNav;
