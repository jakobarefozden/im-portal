import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ClassPage from "./pages/ClassPage";
import BlogListPage from "./pages/BlogListPage";
import NotFoundPage from "./pages/NotFoundPage";
import CoursePage from "./pages/CoursePage";
import ThemePage from "./pages/ThemePage";
import SubThemePage from "./pages/SubThemePage";


function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/class/:classId" element={<ClassPage />} />
        <Route path="/course/:classId/:courseId" element={<CoursePage />} />
        <Route path="/theme/:classId/:courseId/:themeId" element={<ThemePage />} />
        <Route path="/subtheme/:classId/:courseId/:themeId/:subId" element={<SubThemePage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
