import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router"
import employeeService from "../services/employee.service";
import { useParams } from "react-router";


const AddEmployee = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    
    const saveEmployee = (e) =>{
        e.preventDefault();

         if (!name.trim() || !department.trim() || !location.trim()) {
            alert("All fields are required.");
            return;
        }

        const employee = {name,department,location,id};
        if(id){
            //Update Record
            employeeService.update(employee)
            .then(response => {
                console.log("Employee data updated sucessfully", response.data);
                navigate('/employees');
            }).catch(error =>{
                console.log("Something went wrong to update the employee details",error)
            });

        }else{
            //Create a new record
            employeeService.create(employee)
        .then(response =>{
            console.log("Employee data added successfully", response.data);
            navigate('/employees');
        })
        .catch(error =>{
            console.log("Something went wrong to add employee", error);
        });
        }
    }

    useEffect(() =>{
        if (id){
            employeeService.get(id)
            .then(employee =>{
                setName(employee.data.name);
                setDepartment(employee.data.department);
                setLocation(employee.data.location);
            })
            .catch(error =>{
                console.log("Something went wrong!",error)
            });
        }
    },[id])



  return (
    <>
    <div className="container">
      <h1>{id ? "Update Employee" : "Add New Employee"}</h1>
      <hr/>
      <form>

        <div className="form-group">
            <input
                type="text"
                className="form-control col-4"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"/>
        </div>

        <div className="form-group">
                <input
                type="text"
                className="form-control col-4"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Enter Department"/>
        </div>

        <div className="form-group">
                <input
                type="text"
                className="form-control col-4"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Location"/>
        </div>
        <div>
            <button className="btn btn-primary" onClick={(e)=>saveEmployee(e)}>{id? "Update":"Save"}</button>
        </div>
      </form>
      <hr/>
      <Link to="/employees">Back to List</Link>
    </div>
    </>


  )
}

export default AddEmployee
