import { Outlet } from "react-router-dom"
import Navbar from "../components/dashboard/Navbar"
import EmployeeSideBar from "../components/User Dashobard/UserSideBar"

function EmployeeDashboard() {
    return (
        <div className="flex">
        <EmployeeSideBar />
        <div className="flex-1 ml-64 bg-gray-100 h-screen">
            <Navbar />
            {/* <AdminSummary /> */}
            <Outlet />
        </div>
        </div>
      
    )
}

export default EmployeeDashboard
