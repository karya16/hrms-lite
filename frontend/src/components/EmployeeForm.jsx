import { useState } from "react";
import API from "../services/api";

function EmployeeForm({ onEmployeeAdded }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  // ✅ 1. ADD ERROR STATE HERE (TOP of component)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [success, setSuccess] = useState(null);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await API.post("employees/", form);

      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });

      setSuccess("Employee added successfully"); // ✅ SUCCESS MESSAGE
      onEmployeeAdded();
    } catch (err) {
      setError(
        err.response?.data?.employee_id ||
        err.response?.data?.email ||
        "Failed to add employee"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Employee</h3>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      {/* ✅ 3. SHOW ERROR MESSAGE INSIDE JSX */}
      {error && <p className="error">{error}</p>}

      <input
        name="employee_id"
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={handleChange}
        required
      />

      <input
        name="full_name"
        placeholder="Full Name"
        value={form.full_name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        required
      />

      {/* ✅ 4. LOADING STATE */}
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Employee"}
      </button>
    </form>
  );
}

export default EmployeeForm;
