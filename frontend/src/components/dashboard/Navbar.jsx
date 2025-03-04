import { useAuth } from "../../context/authContext"

function Navbar() {
    const {user, logout}= useAuth()

  
    return (
        <div className="flex items-center text-white justify-between h-12 bg-teal-600 ">
       <div className="flex space-x-4">
    
       <p>Welcome {user.name} </p>
      
         <img
          src={
            user.profileImage
              ? `http://localhost:5000/${user.userId.profileImage}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSySSYZ8Vr_66g-cqvEwxmn8qA2KRRTrbcAPA&s"
          }
          alt="User Profile"
          className="h-8 w-8 rounded-full border"
        /> 
      
       
        </div>
        <button className="px-4 py-1 bg-teal-700 hover:bg-teal-800 mr-5" onClick={logout}>Logout</button>
            
        </div>
    )
}

export default Navbar
