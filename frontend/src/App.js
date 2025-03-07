import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import EmployeeDashboard from './pages/UserDashboard';
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/home" />} />
      <Route path='/login' element={<Login />}  />
      <Route path='/admin-dashboard' element={ 
  
      <PrivateRoutes>
        <RoleBaseRoutes requiredRole={["admin"]}>
          <AdminDashboard />
        </RoleBaseRoutes>
      </PrivateRoutes>
      }>
  
        {/* <Route index element={<AdminSummary />} />
        <Route path='/admin-dashboard/departments' element={<DepartmentList />} /> */}
  
  
  
  
  
      
      </Route>
  
  
  
      <Route path='/user-dashboard' element={

        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin", "employee"]}>
   
        <EmployeeDashboard />
  
        </RoleBaseRoutes>
        </PrivateRoutes>
        } >
          {/* <Route index element={<SummaryEmployee />} />
  
          <Route path='/employee-dashboard/profile/:id'  element={<ProfileEmployee />}/>
          <Route path='/employee-dashboard/leaves'  element={<ListLeaves />}/> */}
         
          
  
  
  
  
      </Route>
  
  
  
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
