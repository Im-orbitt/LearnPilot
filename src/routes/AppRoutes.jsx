import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Library from "../pages/Library";
import Subject from "../pages/Subject";
import Chapter from "../pages/Chapter";
import Lesson from "../pages/Lesson";
import Progress from "../pages/Progress";
import Settings from "../pages/Settings";
import Parent from "../pages/Parent";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
        </Route>

        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="library" element={<Library />} />
          <Route path="subject" element={<Subject />} />
          <Route path="chapter" element={<Chapter />} />
          <Route path="lesson" element={<Lesson />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/parent" element={<DashboardLayout />}>
          <Route index element={<Parent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
