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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      <h2 className="text-lg font-semibold text-slate-200 mb-2">
        Add New Employee
      </h2>

      <input
        className="form-input"
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={(e) =>
          setForm({
            ...form,
            employee_id: e.target.value
          })
        }
        required
      />

      <p className="field-error">
        {errors?.employee_id?.[0]}
      </p>

      <input
        className="form-input"
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) =>
          setForm({
            ...form,
            full_name: e.target.value
          })
        }
        required
      />

      <p className="field-error">
        {errors?.full_name?.[0]}
      </p>

      <input
        className="form-input"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value
          })
        }
        required
      />

      <p className="field-error">
        {errors?.email?.[0]}
      </p>

      <input
        className="form-input"
        placeholder="Department"
        value={form.department}
        onChange={(e) =>
          setForm({
            ...form,
            department: e.target.value
          })
        }
        required
      />

      <p className="field-error">
        {errors?.department?.[0]}
      </p>

      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-lg text-sm transition"
      >
        Add Employee
      </button>
    </form>
  );
}

export default EmployeeModal;
