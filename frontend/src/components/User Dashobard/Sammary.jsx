import { useAuth } from '../../context/authContext';
import { FaUser } from "react-icons/fa";

function SummaryCard() {

    const {user}= useAuth()
    return (
       <div className='p-6'>
         <div className='rounded flex bg-white'>
            <div className={`text-3xl flex justify-center items-center text-teal-600 px-4`}>
                <FaUser />
            </div>
            <div className='pl-4 py-1'>
                <p className='text-lg font-semibold'>Welcome Backe</p>
                <p className='text-xl font-bold'>{user.name}</p>
            </div>
        </div>

       </div>
    );
}



export default SummaryCard;