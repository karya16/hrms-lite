import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck } from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="pb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center
                              ">
          <span className="text-white text-sm font-bold font-display">H</span>
        </div>
        <div>
          <p className="font-bold font-display text-white text-sm leading-tight">HRMS Lite</p>
          
        </div>  
      </div>

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