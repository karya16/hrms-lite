
import { useEffect, useState } from "react";
import { api } from "../api";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [message, setMessage] = useState(null);


  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      loadAttendance();
    } else {
      setAttendance([]);
    }
  }, [selectedEmployee]);

  const loadEmployees = async () => {
    const data = await api("employees/");
    setEmployees(data);
  };

  const loadAttendance = async () => {
    const data = await api(
      `attendance/?employee=${selectedEmployee}`
    );
    setAttendance(data);
  };

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };
  
  const handleMarkAttendance = async () => {
    if (!selectedEmployee || !date) {
      showMessage("Please select employee and date ⚠", "error");
      return;
    }

    try {
      await api("attendance/", {
        method: "POST",
        body: JSON.stringify({
          employee: selectedEmployee,
          date,
          status,
        }),
      });

      showMessage("Attendance marked successfully ✅", "success");

      setDate("");
      loadAttendance();
    } catch (err) {
      showMessage("Failed to mark attendance ❌", "error");
    }
  };


  const totalPresent = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  const totalAbsent = attendance.filter(
    (a) => a.status === "Absent"
  ).length;

  const selectedEmpData = employees.find(
  (emp) => emp.id == selectedEmployee
  );

  return (
    <div>
      {message && (
        <div
          className={`top-alert ${
            message.type === "success"
              ? "alert-success"
              : "alert-error"
          }`}
        >
          <div className="alert-content">
            <span className="alert-icon">
              {message.type === "success" ? "✔" : "⚠"}
            </span>
            <span className="alert-text">{message.text}</span>
          </div>

          <button
            className="alert-close"
            onClick={() => setMessage(null)}
          >
            ×
          </button>
        </div>
      )}

      <h1 className="page-title">Attendance</h1>

      {/* Employee Selector */}
      <div className="section">
        <label>Select Employee</label>
        <select
          className="attendance-select"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Choose employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* If No Employee Selected */}
      {!selectedEmployee && (
        <div className="empty-state-box">
          <div className="empty-icon"></div>

          <h3>Select an Employee</h3>

          <p>
            Please choose an employee from the dropdown
            to manage attendance records.
          </p>
        </div>
      )}


      {/* If Employee Selected */}
      {selectedEmployee && (
        <>
          {/* Employee Header */}
          <div className="employee-header">
            <div className="employee-avatar">
              {selectedEmpData?.full_name?.charAt(0)}
            </div>

            <div className="employee-info">
              <h2>{selectedEmpData?.full_name}</h2>
              <p>
                {selectedEmpData?.employee_id} •{" "}
                {selectedEmpData?.department} •{" "}
                {selectedEmpData?.email}
              </p>
            </div>
          </div>
          {/* Mark Attendance */}
          <div className="section">
            <h3>Mark Attendance</h3>

            <div className="attendance-row">
              <input
                className="attendance-select"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <select
                className="attendance-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>

              <button onClick={handleMarkAttendance}>
                Mark
              </button>
            </div>
          </div>

          {/* Attendance Records */}
          <div className="section">
            <h3>Attendance Records</h3>

            {/* Overview at top of table */}
            <div className="overview-inline">
              <span>Total: {attendance.length}</span>
              <span>Present: {totalPresent}</span>
              <span>Absent: {totalAbsent}</span>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>
                        <span
                          className={
                            item.status === "Present"
                              ? "status-present"
                              : "status-absent"
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {attendance.length === 0 && (
                <p className="empty-state">
                  No attendance records found.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Attendance;

/*
import { useEffect, useState } from "react";
import { api } from "../api";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  const loadData = async () => {
    const emp = await api("employees/");
    const att = await api("attendance/");
    setEmployees(emp);
    setAttendance(att);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.employee || !form.date) {
      setError("All fields are required.");
      return;
    }

    try {
      setError("");
      setMessage("");

      await api("attendance/", {
        method: "POST",
        body: JSON.stringify({
          employee: Number(form.employee),
          date: form.date,
          status: form.status,
        }),
      });

      setMessage("Attendance marked successfully.");

      setForm({
        employee: "",
        date: "",
        status: "Present",
      });

      loadData();
    } catch (err) {
      setError(
        typeof err === "object"
          ? Object.values(err).flat().join(" ")
          : "Something went wrong"
      );
    }
  };




  return (
    <div>
      <h1>Attendance</h1>

      {message && <div className="success">{message}</div>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="card">
        <select required
          value={form.employee}
          onChange={e => setForm({...form, employee: e.target.value})}>
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <input type="date"
          required
          value={form.date}
          onChange={e => setForm({...form, date: e.target.value})} />

        <select
          value={form.status}
          onChange={e => setForm({...form, status: e.target.value})}>
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button type="submit">Mark Attendance</button>
      </form>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map(a => (
              <tr key={a.id}>
                <td>{a.employee_name}</td>
                <td>{a.date}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;*/
