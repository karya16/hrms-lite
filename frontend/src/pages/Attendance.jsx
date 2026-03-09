
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
            <span className="text-[18px] font-bold">
              {message.type === "success" ? "✔" : "⚠"}
            </span>

            <span className="text-sm">
              {message.text}
            </span>
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
        <label className="block mb-2 text-slate-400 text-sm">
          Select Employee
        </label>

        <select
          className="attendance-select w-full max-w-[260px]"
          value={selectedEmployee}
          onChange={(e) =>
            setSelectedEmployee(e.target.value)
          }
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
          <div className="text-[40px] mb-[15px] opacity-80">
            👤
          </div>

          <h3 className="text-lg mb-2 text-gray-800">
            Select an Employee
          </h3>

          <p className="text-sm text-gray-500 max-w-[400px] mx-auto leading-relaxed">
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

            <div>
              <h2 className="text-lg font-semibold">
                {selectedEmpData?.full_name}
              </h2>

              <p className="text-[13px] text-slate-400">
                {selectedEmpData?.employee_id} •{" "}
                {selectedEmpData?.department} •{" "}
                {selectedEmpData?.email}
              </p>
            </div>
          </div>

          {/* Mark Attendance */}
          <div className="section">
            <h3 className="mb-[15px] text-[16px] font-medium">
              Mark Attendance
            </h3>

            <div className="flex gap-[15px] items-center flex-wrap">
              <input
                className="attendance-select"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <select
                className="attendance-select"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>
              </select>

              <button
                onClick={handleMarkAttendance}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Mark
              </button>
            </div>
          </div>

          {/* Attendance Records */}
          <div className="section">
            <h3 className="mb-[15px] text-[16px] font-medium">
              Attendance Records
            </h3>

            {/* Overview */}
            <div className="flex gap-[30px] text-sm text-slate-300 mb-4">
              <span>Total: {attendance.length}</span>
              <span>Present: {totalPresent}</span>
              <span>Absent: {totalAbsent}</span>
            </div>

            <div className="table-container">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-700 text-slate-400">
                  <tr>
                    <th className="text-left py-2">
                      Date
                    </th>

                    <th className="text-left py-2">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-700">
                  {attendance.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2">
                        {item.date}
                      </td>

                      <td className="py-2">
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
                <p className="mt-[15px] text-slate-400">
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
