import { useEffect, useState } from "react";
import { api } from "../api";
import { Users, CalendarCheck, Building2 } from "lucide-react";

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

  const todays = new Date().toLocaleDateString("en-IN", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  });

  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] =
      (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  

  return (
    <div>

      <h1 className="page-title">Dashboard</h1>
      <p className="text-slate-400 text-sm mt-1">{todays}</p>

      {/* Workforce Overview */}
      <div className="section-card mb-[30px]">

        <h3 className="flex items-center gap-2 mb-5 text-[16px] font-semibold text-slate-300">
          <span className="p-1.5 rounded-md bg-blue-500/10">
            <Users size={16} className="text-blue-400" />
          </span>
          Workforce Overview
        </h3>

        <div className="stat-grid">

          <div className="stat-item stat-purple">
            
            <div className="stat-label text-purple-400">👥 Total Employees</div>
            <div className="stat-value">{totalEmployees}</div>
          </div>

          <div className="stat-item stat-blue">
            <div className="stat-label text-blue-400">🏢 Departments</div>
            <div className="stat-value">{departments.length}</div>
          </div>

        </div>

      </div>

      {/* Attendance */}
      <div className="section-card mb-[30px]">

        <h3 className="flex items-center gap-2 mb-5 text-[16px] font-semibold text-slate-300">
          <CalendarCheck size={18} className="text-emerald-400" />
          Today's Attendance
        </h3>

        <div className="stat-grid">

          <div className="stat-item stat-green">
            <div className="stat-label text-green-400">✅ Present</div>
            <div className="stat-value">{presentToday}</div>
          </div>

          <div className="stat-item stat-red">
            <div className="stat-label text-red-400">❌ Absent</div>
            <div className="stat-value">{absentToday}</div>
          </div>

          <div className="stat-item stat-amber">
            <div className="stat-label text-amber-400">⏳ Not Marked</div>
            <div className="stat-value">{notMarked}</div>
          </div>

        </div>

        <div className="rate-container">

          <div className="rate-info">
            <span>Attendance Rate</span>
            <div className="rate-badge">{attendanceRate}%</div>
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
      <div className="section-card">

        <h3 className="flex items-center gap-2 mb-5 text-[16px] font-semibold text-slate-300">
          <Building2 size={18} className="text-indigo-400" />
          Department Distribution
        </h3>

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