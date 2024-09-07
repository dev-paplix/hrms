
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './screens/AdminPanel';
import Departement from './screens/Departement';
import Employee from './screens/Employee';
import Hr from './screens/Hr';
import Login from './screens/Login';
import Payroll from './screens/payroll';
const App = () => {


  return (
  
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="adminpanel" element={<AdminPanel/>} />
        <Route path="departement" element={<Departement/>} />
        <Route path="employee" element={<Employee/>} />
        <Route path="hr" element={<Hr/>} />
        <Route path="payroll" element={<Payroll/>} />

      </Routes>
    
    </>
  
  )

}

export default App;
