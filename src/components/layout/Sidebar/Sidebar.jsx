import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import { useBook } from "../../../hooks/useBook";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import {
  Brain,
  LayoutDashboard,
  Library,
  BarChart3,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  List,
} from "lucide-react";

const links = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/library", label: "Library", icon: Library },
  { to: "/app/progress", label: "Progress", icon: BarChart3 },
  { to: "/app/parent", label: "Parent", icon: Users },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function Sidebar({ collapsed, onToggle, lessonMode = false, lessonType = "" }) {
  const { currentTopic } = useBook();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (lessonMode && lessonType === "quiz") {
    return <aside className="sidebar lesson-sidebar lesson-sidebar-empty" />;
  }

  if (lessonMode && lessonType === "notes") {
    const headings =
      currentTopic?.notes
        ?.split("\n")
        .filter((line) => /^#{1,3}\s/.test(line))
        .map((line) => line.replace(/^#{1,3}\s/, "").trim()) ?? [];

    return (
      <aside className="sidebar lesson-sidebar notes-outline">
        <div className="lesson-sidebar-header">
          <List size={18} />
          <span>Notes Outline</span>
        </div>

        <nav className="notes-outline-list">
          {headings.length > 0 ? (
            headings.map((heading, index) => (
              <a href={`#notes-heading-${index}`} key={`${heading}-${index}`}>
                {heading}
              </a>
            ))
          ) : (
            <p>No sections available.</p>
          )}
        </nav>
      </aside>
    );
  }

  return (
    <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
      <div className="sidebar-logo">
        <Brain size={28} />

        {!collapsed && <span>LearnPilot</span>}

        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      <nav>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} title={collapsed ? label : undefined}>
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
      {user && (
        <div className="sidebar-account">
          <div className="sidebar-account-info">
            <div className="sidebar-account-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {!collapsed && (
              <div className="sidebar-account-details">
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              className="sidebar-logout"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              Log out
            </button>
          )}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
