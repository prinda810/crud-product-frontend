import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import employeeService from "../services/employee.service";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Optional error state

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setLoading(true);
    setError(null);
    employeeService
      .getAll()
      .then((response) => {
        console.log("Printing the employees data", response.data);
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        setError("Failed to load employees.");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    employeeService
      .remove(id)
      .then((response) => {
        console.log("Employee deleted successfully", response.data);
        init();
      })
      .catch((error) => {
        console.log("Something went wrong during delete the employee", error);
      });
  };

  return (
    <>
      <div className="container mt-4">
        <h3 className="text-center">List of Employees</h3>
        <hr />

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-2">Loading employees...</p>
            <p className="mt-1">If loading takes too long, please refresh the page.</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <>
            <div className="mb-3 text-end">
              <Link to="/add" className="btn btn-primary">Add Employee</Link>
            </div>

            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">No employees found.</td>
                  </tr>
                ) : (
                  employees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{index + 1}</td>
                      <td>{employee.name}</td>
                      <td>{employee.department}</td>
                      <td>{employee.location}</td>
                      <td>
                        <Link className="btn btn-info mr-2" to={`/employees/edit/${employee.id}`}>Update</Link>
                        <button className="btn btn-danger" onClick={() => handleDelete(employee.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default EmployeesList;
