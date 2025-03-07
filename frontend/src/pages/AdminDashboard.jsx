import { Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/authContext"
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import { useAuth } from "../context/authContext";


function AdminDashboard() {

    const {user, loading}= useAuth();

    const navigate= useNavigate();

    if(loading){
        return <div>Loading</div>
    }

    if(!user){
        navigate("/login")
    }

    return (
        <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 bg-gray-100 h-screen">
            <Navbar />
            {/* <AdminSummary /> */}
            <Outlet />
            <h1>Hello Test</h1>
        </div>
            
        </div>
    )
}

export default AdminDashboard
