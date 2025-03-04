import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    
  <Routes>
    <Route path='/' element={<Navigate to="/admin-dashboard" />} />
    <Route path='/login' element={<Login />}  />
    <Route path='/admin-dashboard' element={<AdminDashboard />} />

</Routes>
</BrowserRouter>
   
  );
}

export default App;
