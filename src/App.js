import { BrowserRouter,Switch, Route, Routes } from "react-router-dom";
import EmployeesList from "./components/EmployeesList";
import NotFound from "./components/NotFound";
import AddEmployee from "./components/AddEmployee";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Switch> */}
          <Routes>
            <Route exact path="/" Component={EmployeesList}/>
            <Route exact path="/add" Component={AddEmployee}/>
            <Route exact path="/employees/edit/:id" Component={AddEmployee}/>
            <Route path="*" Component={NotFound}/>
          </Routes>

        {/* </Switch> */}
      </div>
    </BrowserRouter>
  )
}

export default App;
