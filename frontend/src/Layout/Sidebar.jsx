import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>HRMS Lite</h2>
      <NavLink to="/employees">Employees</NavLink>
      <NavLink to="/attendance">Attendance</NavLink>
    </div>
  );
}

export default Sidebar;
