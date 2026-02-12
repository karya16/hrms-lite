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

export default Attendance;
