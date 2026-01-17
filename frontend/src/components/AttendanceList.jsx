import { useEffect, useState } from "react";
import API from "../services/api";

function AttendanceList({ employeeId }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (employeeId) {
      API.get(`attendance/${employeeId}/`).then((res) =>
        setRecords(res.data)
      );
    }
  }, [employeeId]);

  if (!employeeId)
  return <p className="empty">Select an employee to view attendance.</p>;

  if (records.length === 0)
    return <p className="empty">No attendance records found.</p>;

  return (
    <>
      <h3>Attendance Records</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

}

export default AttendanceList;
