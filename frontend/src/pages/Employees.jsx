import { useEffect, useState } from "react";
import { api } from "../api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await api("employees/");
      setEmployees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrors({});

    // Frontend Required Validation
    const newErrors = {};
    if (!form.employee_id) newErrors.employee_id = ["Employee ID is required"];
    if (!form.full_name) newErrors.full_name = ["Full Name is required"];
    if (!form.email) newErrors.email = ["Email is required"];
    if (!form.department) newErrors.department = ["Department is required"];

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await api("employees/", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setMessage("Employee added successfully.");

      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });

      loadEmployees();
    } catch (err) {
      setErrors(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api(`employees/${id}/`, { method: "DELETE" });
      setMessage("Employee deleted successfully.");
      loadEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Employees</h1>

      {message && <div className="success">{message}</div>}

      <form onSubmit={handleSubmit} className="card form-grid">

        <div className = "form-group">
          <input
            placeholder="Employee ID"
            value={form.employee_id}
            onChange={(e) =>
              setForm({ ...form, employee_id: e.target.value })
            }
          />
          <div className="field-error">
            {errors.employee_id ? errors.employee_id[0] : ""}
          </div>  
        </div>

        <div className = "form-group">
          <input
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />
          <div className="field-error">
            {errors.full_name ? errors.full_name[0] : ""}
          </div>
          
        </div>

        <div className="form-group">
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <div className="field-error">
            {errors.email ? errors.email[0] : ""}
          </div>
        </div>

        <div className = "form-group">
          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />
          <div className="field-error">
            {errors.department ? errors.department[0] : ""}
          </div>
          
        </div>

        <div className = "form-group">
          <button type="submit">Add Employee</button>
          <div className="field-error">
              
          </div>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {!loading && employees.length === 0 && <p>No employees found.</p>}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button onClick={() => handleDelete(emp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;
