import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import employeeService from "../services/employee.service";
import { Link } from "react-router-dom";

const EmployeesList = () => {

 const [employees, setEmployees] = useState([]);

 useEffect(()=>{
    init();
 },[])

 const init = () =>{
  employeeService.getAll()
  .then(response =>{
    console.log('Printing the employees data',response.data);
    setEmployees(response.data)
  })
  .catch(error =>{
    console.log('Something went wrong',error);
  })
 }

 const handleDelete = id =>{
    employeeService.remove(id)
    .then(response =>{
      console.log("Employee deleted successfully",response.data);
      init();
    })
    .catch(error =>{
      console.log("Something went wrong during delete the employee",error);
    })

 }

  return ( 
    <div className="container">
      <h3>List of Employees</h3>
      <hr></hr>
      <div>
        <Link to="/add" className="btn btn-primary mb-2">Add Employee</Link>
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
  {
    employees.map((employee, index) => (
      <tr key={employee.id}>
        <td>{index + 1}</td>
        <td>{employee.name}</td>
        <td>{employee.department}</td>
        <td>{employee.location}</td>
        <td>
          <Link className="btn btn-info" to={`/employees/edit/${employee.id}`}>Update</Link>
          <button className="btn btn-danger ml-2" onClick={() => handleDelete(employee.id)}>Delete</button>
        </td>
      </tr>
    ))
  }
</tbody>

        </table>
      </div>

    </div>
   );
}
 
export default EmployeesList;