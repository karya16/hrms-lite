import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck } from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="sidebar-title">HRMS Lite</h2>

      <NavLink to="/" className="nav-link">
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/employees" className="nav-link">
        <Users size={18} />
        <span>Employees</span>
      </NavLink>

      <NavLink to="/attendance" className="nav-link">
        <CalendarCheck size={18} />
        <span>Attendance</span>
      </NavLink>

    </div>
  );
}

export default Sidebar;