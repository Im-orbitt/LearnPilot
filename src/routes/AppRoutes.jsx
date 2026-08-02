import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Landing from "../pages/Landing";
import Parent from "../pages/Parent";
import Progress from "../pages/Progress";
import Lesson from "../pages/Lesson";
import Chapter from "../pages/Chapter";
import Subject from "../pages/Subject";
import Library from "../pages/Library";
import Settings from "../pages/Settings";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="parent" element={<Parent />} />
          <Route path="progress" element={<Progress />} />
          <Route path="lesson" element={<Lesson />} />
          <Route path="chapter" element={<Chapter />} />
          <Route path="subject" element={<Subject />} />
          <Route path="library" element={<Library />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
