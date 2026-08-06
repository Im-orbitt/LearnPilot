import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside>
      <h2>LearnPilot</h2>

      <nav>
        <NavLink to="/app/dashboard">Dashboard</NavLink>
        <br />
        <NavLink to="/app/library">Library</NavLink>
        <br />
        <NavLink to="/app/progress">Progress</NavLink>
        <br />
        <NavLink to="/app/parent">Parent</NavLink>
        <br />
        <NavLink to="/app/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
