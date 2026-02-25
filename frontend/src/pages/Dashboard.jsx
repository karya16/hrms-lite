import { useEffect, useState } from "react";
import { api } from "../api";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const empData = await api("employees/");
    const attData = await api("attendance/");
    setEmployees(empData);
    setAttendance(attData);
  };

  const today = new Date().toISOString().split("T")[0];

  const todayRecords = attendance.filter(
    (a) => a.date === today
  );

  const totalEmployees = employees.length;

  const presentToday = todayRecords.filter(
    (a) => a.status === "Present"
  ).length;

  const absentToday = todayRecords.filter(
    (a) => a.status === "Absent"
  ).length;

  const notMarked = totalEmployees - todayRecords.length;

  const attendanceRate =
    totalEmployees > 0
      ? Math.round((presentToday / totalEmployees) * 100)
      : 0;

  const departments = [
    ...new Set(employees.map((e) => e.department)),
  ];

  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] =
      (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="main-cont">
      <h1 className="page-title">Dashboard</h1>

      {/* Workforce Overview */}
      <div className="dashboard-section">
        <h3>Workforce Overview</h3>

        <div className="stat-grid">
          <div className="stat-item">
            <div className="stat-label">
              👥 Total Employees
            </div>
            <div className="stat-value">
              {totalEmployees}
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-label">
              🏢 Departments
            </div>
            <div className="stat-value">
              {departments.length}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Attendance */}
      <div className="dashboard-section">
        <h3>Today's Attendance</h3>

        <div className="stat-grid">
          <div className="stat-item">
            <div className="stat-label">✅ Present</div>
            <div className="stat-value">
              {presentToday}
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-label">❌ Absent</div>
            <div className="stat-value">
              {absentToday}
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-label">⏳ Not Marked</div>
            <div className="stat-value">
              {notMarked}
            </div>
          </div>
        </div>

        {/* Attendance Rate Bar */}
        <div className="attendance-rate-container">
            <div className="rate-info">
                <span>Attendance Rate</span>
                <div className="rate-badge">
                {attendanceRate}%
                </div>
            </div>

            <div className="rate-track">
                <div
                className="rate-fill"
                style={{ width: `${attendanceRate}%` }}
                ></div>
            </div>
            </div>
      </div>

      {/* Department Distribution */}
      <div className="dashboard-section">
        <h3>Department Distribution</h3>

        <div className="dept-box">
            <div className="dept-scroll">
            <div className="dept-grid">
                {Object.entries(departmentCounts).map(([dept, count]) => (
                <div key={dept} className="dept-row">

                    <div className="dept-left">
                        <span className="dept-dot"></span>
                        <span className="dept-name">{dept}</span>
                    </div>

                    <div className="dept-progress">
                        <div
                        className="dept-fill"
                        style={{
                            width: `${(count / totalEmployees) * 100}%`
                        }}
                        ></div>
                    </div>

                    <span className="dept-count">{count}</span>

                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Dashboard;