import { NavLink} from 'react-router-dom';
import { MdDashboard, MdEditCalendar, MdMonetizationOn, MdSettings, MdVerifiedUser } from "react-icons/md";
import { useAuth } from '../../context/authContext';


function EmployeeSideBar() {
    const {user} = useAuth();
    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 space-y-2 w-64">
            <div className='bg-teal-600 h-12 flex items-center justify-center'>
                <h3 className='text-2xl text-center font-lobster'>Employee MS</h3>

            </div>

            <div className='px-4' >
                <NavLink to="/employee-dashboard" className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `} end>
                   <MdDashboard />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `}>
                    <MdVerifiedUser />
                    <span>Profile</span>
                </NavLink>
           
                <NavLink to="/employee-dashboard/leaves" className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `}>
                    <MdEditCalendar />
                    <span>Leave</span>
                </NavLink>
                
                <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `}>
                    <MdMonetizationOn />
                    <span>Salary</span>
                </NavLink>

              
                <NavLink to="/employee-dashboard/setting" className={({isActive}) => `${isActive ? "bg-teal-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded `}>
                <MdSettings />
                    <span>Settings</span>
                </NavLink>
            </div>
            
        </div>
    )
}

export default EmployeeSideBar

