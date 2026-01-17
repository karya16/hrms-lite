import { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceList from "./components/AttendanceList";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("employees");
  const [refresh, setRefresh] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className="app-container">
      <header className="header">
        <h1>HRMS Lite</h1>
        <nav className="nav">
          <button
            className={activeTab === "employees" ? "active" : ""}
            onClick={() => setActiveTab("employees")}
          >
            Employees
          </button>
          <button
            className={activeTab === "attendance" ? "active" : ""}
            onClick={() => setActiveTab("attendance")}
          >
            Attendance
          </button>
        </nav>
      </header>

      <main className="content">
        {activeTab === "employees" && (
          <>
            <div className="card">
              <EmployeeForm onEmployeeAdded={() => setRefresh(!refresh)} />
            </div>

            <div className="card">
              <EmployeeList
                refresh={refresh}
                onSelectEmployee={setSelectedEmployee}
              />
            </div>
          </>
        )}

        {activeTab === "attendance" && (
          <>
            <div className="card">
              <AttendanceForm onAdded={() => setRefresh(!refresh)} />
            </div>

            <div className="card">
              <AttendanceList employeeId={selectedEmployee} />
            </div>
          </>
        )}
      </main>

    </div>
  );
}

export default App;
