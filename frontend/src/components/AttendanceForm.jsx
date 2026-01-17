import { useState, useEffect } from "react";
import API from "../services/api";

function AttendanceForm({ onAdded }) {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    API.get("employees/").then((res) => setEmployees(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitAttendance = async (e) => {
    e.preventDefault();
    try {
      await API.post("attendance/", form);
      alert("Attendance marked");
      onAdded();
    } catch {
      alert("Attendance already marked for this date");
    }
  };

  return (
    <form onSubmit={submitAttendance}>
      <h3>Mark Attendance</h3>

      <select name="employee" onChange={handleChange} required>
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.full_name}
          </option>
        ))}
      </select>

      <input type="date" name="date" onChange={handleChange} required />

      <select name="status" onChange={handleChange}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}

export default AttendanceForm;
