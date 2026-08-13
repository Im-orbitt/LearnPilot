import "./DashboardLayout.css";

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar/Sidebar";
import Topbar from "../components/layout/Topbar/Topbar";

function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { pathname } = useLocation();

  const lessonMode = [
    "/app/lesson/notes",
    "/app/lesson/quiz",
    "/app/lesson/tutor",
  ].includes(pathname);

  const lessonType = pathname.split("/").pop();

  return (
    <div
      className={`dashboard-layout ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      } ${lessonMode ? `lesson-mode lesson-mode-${lessonType}` : ""}`}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((collapsed) => !collapsed)}
        lessonMode={lessonMode}
        lessonType={lessonType}
      />

      <div className="dashboard-main">
        <Topbar lessonMode={lessonMode} lessonType={lessonType} />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
