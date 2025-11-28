import TopNav from "./TopNav";

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">IM Fagportal</div>
        <TopNav />
      </div>
    </header>
  );
}

export default Header;
