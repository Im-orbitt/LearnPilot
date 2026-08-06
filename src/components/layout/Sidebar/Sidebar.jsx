import { NavLink } from "react-router-dom";

const links = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/library", label: "Library" },
  { to: "/app/progress", label: "Progress" },
  { to: "/app/parent", label: "Parent" },
  { to: "/app/settings", label: "Settings" },
];

function Sidebar() {
  return (
    <aside>
      <h2>LearnPilot</h2>

      <nav>
        {links.map((link) => (
          <div key={link.to}>
            <NavLink to={link.to}>{link.label}</NavLink>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
