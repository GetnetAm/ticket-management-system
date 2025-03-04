// import { useAuth } from "../../context/authContext"
import { NavLink} from 'react-router-dom';
import { MdBuild, MdDashboard, MdEditCalendar, MdMoney, MdSettings, MdVerifiedUser } from "react-icons/md";


function AdminSidebar() {
    // const {user} = useAuth()
    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 space-y-2 w-64">
            <div className='bg-teal-600 h-12 flex items-center justify-center'>
                <h3 className='text-2xl text-center font-lobster'>Employee MS</h3>

            </div>

            <div className='px-4' >
                <NavLink to="/admin-dashboard" className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `} end>
                   <MdDashboard />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin-dashboard/employees" className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `}>
                    <MdVerifiedUser />
                    <span>Employee</span>
                </NavLink>
                <NavLink to="/admin-dashboard/departments" className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `} >
                <MdBuild />
                    <span>Department</span>
                </NavLink>
                {/* <NavLink to={`/admin-dashboard/leaves/${user._id}`}  className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `} >
                    <MdEditCalendar />
                    <span>Leave</span>
                </NavLink> */}
                    <NavLink to="/admin-dashboard/leaves"  className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `} >
                    <MdEditCalendar />
                    <span>Leave</span>
                </NavLink>

                <NavLink to="/admin-dashboard/add-salary" className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `} >
                <MdMoney />
                    <span>Salary</span>
                </NavLink>
                <NavLink to="/admin-dashboard/setting"  className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `} >
                <MdSettings />
                    <span>Settings</span>
                </NavLink>
            </div>
            
        </div>
    )
}

export default AdminSidebar
