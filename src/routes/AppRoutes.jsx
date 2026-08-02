import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ParentPage from "../pages/ParentPage";
import ProgressPage from "../pages/ProgressPage";
import LessonPage from "../pages/LessonPage";
import ChapterPage from "../pages/ChapterPage";
import SubjectPage from "../pages/SubjectPage";
import LibraryPage from "../pages/LibraryPage";
import SettingsPage from "../pages/SettingsPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/parent" element={<ParentPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/chapter" element={<ChapterPage />} />
        <Route path="/subject" element={<SubjectPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
