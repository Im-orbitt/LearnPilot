import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import {
  Brain,
  LayoutDashboard,
  Library,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

const links = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/library", label: "Library", icon: Library },
  { to: "/app/progress", label: "Progress", icon: BarChart3 },
  { to: "/app/parent", label: "Parent", icon: Users },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Brain size={28} />
        <span>LearnPilot</span>
      </div>

      <nav>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
