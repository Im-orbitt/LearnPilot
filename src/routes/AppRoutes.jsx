import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Library from "../pages/Library";
import Chapter from "../pages/Chapter";

import Lesson from "../pages/Lesson";
import Notes from "../pages/Notes";
import Quiz from "../pages/Quiz";
import QuizAnswers from "../pages/QuizAnswers";
import Tutor from "../pages/Tutor";

import Progress from "../pages/Progress";
import Settings from "../pages/Settings";
import Parent from "../pages/Parent";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        {/* Application */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="library" element={<Library />} />
          <Route path="chapter" element={<Chapter />} />
          <Route path="lesson" element={<Lesson />} />
          /* lesson sub-routes */
          <Route path="lesson/notes" element={<Notes />} />
          <Route path="lesson/quiz" element={<Quiz />} />
          <Route path="lesson/quiz/answers" element={<QuizAnswers />} />
          <Route path="lesson/tutor" element={<Tutor />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
          <Route path="parent" element={<Parent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
