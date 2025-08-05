import { BrowserRouter,Route, Routes } from "react-router-dom";
import EmployeesList from "./components/EmployeesList";
import NotFound from "./components/NotFound";
import AddEmployee from "./components/AddEmployee";
import Home from "./components/Home";


function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route exact path="/" Component={Home}/>
            <Route exact path="/employees" Component={EmployeesList}/>
            <Route exact path="/add" Component={AddEmployee}/>
            <Route exact path="/employees/edit/:id" Component={AddEmployee}/>
            <Route path="*" Component={NotFound}/>
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
