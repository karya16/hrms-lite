import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck, X } from "lucide-react";

function Sidebar({ open, setOpen }) {
  return (

    <div
      className={`sidebar 
      ${open ? "translate-x-0" : "-translate-x-full"} 
      sm:translate-x-0`}
    >

      {/* Close button (mobile only) */}
      <button
        onClick={() => setOpen(false)}
        className="sm:hidden absolute top-4 right-4 text-slate-300"
      >
        <X size={20} />
      </button>

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-box">
          <span className="logo-letter">H</span>
        </div>

        <div className="logo-text">
          <p className="logo-title">HRMS Lite</p>
        </div>
      </div>

      <NavLink to="/" className="nav-link" onClick={() => setOpen(false)}>
        <LayoutDashboard size={18} />
        <span className="nav-text">Dashboard</span>
      </NavLink>

      <NavLink to="/employees" className="nav-link" onClick={() => setOpen(false)}>
        <Users size={18} />
        <span className="nav-text">Employees</span>
      </NavLink>

      <NavLink to="/attendance" className="nav-link" onClick={() => setOpen(false)}>
        <CalendarCheck size={18} />
        <span className="nav-text">Attendance</span>
      </NavLink>

    </div>
  );
}

export default Sidebar;