import { useState } from "react";

function EmployeeModal({ onSubmit, errors }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <h2>Add New Employee</h2>

      <input
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={(e) =>
          setForm({ ...form, employee_id: e.target.value })
        }
        required
      />
      <p className="field-error">
        {errors?.employee_id?.[0]}
      </p>

      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) =>
          setForm({ ...form, full_name: e.target.value })
        }
        required
      />
      <p className="field-error">
        {errors?.full_name?.[0]}
      </p>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        required
      />
      <p className="field-error">
        {errors?.email?.[0]}
      </p>

      <input
        placeholder="Department"
        value={form.department}
        onChange={(e) =>
          setForm({ ...form, department: e.target.value })
        }
        required
      />
      <p className="field-error">
        {errors?.department?.[0]}
      </p>

      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeModal;
