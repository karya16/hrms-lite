import { useState, useEffect } from "react";
import API from "../services/api";

function EmployeeList({ refresh, onSelectEmployee }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    API.get("employees/")
      .then((res) => setEmployees(res.data))
      .finally(() => setLoading(false));
  }, [refresh]);

  if (loading) return <p>Loading employees...</p>;
  if (employees.length === 0)
    return <p className="empty">No employees added yet.</p>;

  return (
    <>
      <h3>Employees (click row to view attendance in attendance tab)</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr
              key={e.id}
              className="clickable"
              onClick={() => onSelectEmployee(e.id)}
            >
              <td>{e.full_name}</td>
              <td>{e.department}</td>
              <td>
                <button
                  className="danger"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    API.delete(`employees/${e.id}/`).then(() =>
                      setEmployees((prev) =>
                        prev.filter((x) => x.id !== e.id)
                      )
                    );
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}


export default EmployeeList;
