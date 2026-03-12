
import { useEffect, useState } from "react";
import { api } from "../api";
import Modal from "../components/Modal";
import EmployeeModal from "../components/EmployeeModal";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleAddEmployee = async (form) => {
    try {
      setErrors({});
      await api("employees/", {
        method: "POST",
        body: JSON.stringify(form),
      });

      showMessage("Employee added successfully 🎉", "success");

      setIsModalOpen(false);
      loadEmployees();
    } catch (err) {
      showMessage("Failed to add employee ❌", "error");
      setErrors(err.data || {});
    }
  };


  const showMessage = (text, type = "success") => {
    setMessage({ text, type });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await api(`employees/${id}/`, { method: "DELETE" });

      showMessage("Employee deleted successfully 🗑️", "success");

      loadEmployees();
    } catch (err) {
      showMessage("Failed to delete employee ❌", "error");
    }
  };


  const filteredEmployees = employees.filter((emp) =>
    emp.full_name.toLowerCase().includes(search.toLowerCase())
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

      {/* Page Header */}
      <div className="page-header mb-[30px]">
        <h1 className="text-xl font-semibold text-slate-200">
          Employees
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Add Employee
        </button>
      </div>

      {/* Search */}
      <input
        className="search-input w-full max-w-[280px]"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Card */}
      <div className="card ">
        
          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : (
            <div className="table-wrapper">
              <table className="  employee-table">
                <thead className="text-slate-400 border-b border-slate-700">
                  <tr>
                    <th className="text-left py-3">Name</th>
                    <th className="text-left py-3">ID</th>
                    <th className="text-left py-3">Department</th>
                    <th className="text-left py-3">Email</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-700">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <tr key={emp.id}>
                        <td className="py-3">
                          {emp.full_name}
                        </td>

                        <td className="py-3">
                          {emp.employee_id}
                        </td>

                        <td className="py-3">
                          <span className="badge">
                            {emp.department}
                          </span>
                        </td>

                        <td className="py-3">
                          {emp.email}
                        </td>

                        <td className="py-3">
                          <button
                            className="danger-btn"
                            onClick={() =>
                              handleDelete(emp.id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="no-data-cell"
                      >
                        No employees found 🔍
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>   
        )}
        
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <EmployeeModal
          onSubmit={handleAddEmployee}
          errors={errors}
        />
      </Modal>
    </div>
  );
}

export default Employees;