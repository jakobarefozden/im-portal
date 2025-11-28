import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="app-root">
      <Header />
      <main className="main-layout">
        <SideNav />
        <section className="content">{children}</section>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
