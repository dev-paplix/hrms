
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './screens/AdminPanel';
import Department from './screens/Department';
import Employee from './screens/Employee';
import Hr from './screens/Hr';
import Login from './screens/Login';
import Payroll from './screens/Payroll';


const App = () => {


  return (
  
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="adminpanel" element={<AdminPanel/>} />
        <Route path="department" element={<Department/>} />
        <Route path="employee" element={<Employee/>} />
        <Route path="hr" element={<Hr/>} />
        <Route path="payroll" element={<Payroll/>} />

      </Routes>
    
    </>
  
  )

}

export default App;
