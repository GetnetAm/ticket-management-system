// import { useState } from "react";
// import { useAuth } from "../../context/authContext";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";

// function Setting() {
//     const {user}= useAuth();
//     const navigate= useNavigate()

//     const [setting, setSetting]=useState({
//         userId: user._id,
//         oldPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//     })

//     const [error, setError]= useState(null)
    


//     const handleChange=(e)=>{
//         const {name, value}=e.target;
//         setSetting({...setting, [name]: value})
        
//     }

//     const handleSubmit=async(e)=>{
//         e.preventDefault();
//         if(setting.newPassword !==setting.confirmPassword){
//             setError("Password not match")
//         }
//         else{
//             try {
//                 const response= await axios.put("http://localhost:5000/api/setting/password",setting,
//                     {
//                         headers: {
//                             "Authorization": `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     }

//                 )
//                 if(response.data.success){
//                     navigate('/employee-dashboard/profile/:id')
//                     setError("")
//                 }
                
//             } catch (error) {
//                 if(error.response && !error.response.data.success){
//                     setError(error.response.data.error)
//                 }
                
//             }
//         }
//     }
//     return (
//         <div className="max-w-3xl mx-auto mt-10 bg-white p-8 round-md shadow-md w-96">
//             <h2 className="text-2xl font-bold mb-6">Change Password</h2>
//             <p className="text-red-500">{error}</p>

//             <form onSubmit={handleSubmit}>
//             <div>
//                 <label className="text-sm font-medium text-gray-700">Old Password</label>
//                 <input
//                 type="password"
//                 name="oldPassword"
//                 placeholder="Change Password"
//                 onChange={handleChange}
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md"/>
                
//             </div>
//             <div>
//                 <label className="text-sm font-medium text-gray-700">New Password</label>
//                 <input
//                 type="password"
//                 name="newPassword"
//                 placeholder="New Password"
//                 onChange={handleChange}
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md"/>
                
//             </div>
//             <div>
//                 <label className="text-sm font-medium text-gray-700">Confirm Password</label>
//                 <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 onChange={handleChange}
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md"/>
                
//             </div>

//             <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-md">
//                 Change Password
//             </button>
//             </form>
       
//         </div>
//     )
// }

// export default Setting


import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Setting() {
    const { user } = useAuth(); // Correctly destructure `user` from `useAuth`
    const navigate = useNavigate();

    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password match
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Passwords do not match");
            return; // Stop execution
        }

        try {
            // Make API request to change password
            const response = await axios.put(
                "http://localhost:5000/api/setting/password",
                setting,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                navigate(`/employee-dashboard/profile/${user._id}`); // Use actual user ID
                setError("");
            }
        } catch (err) {
            // Handle API errors
            const message =
                err.response?.data?.error || "An unexpected error occurred";
            setError(message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 round-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Old Password
                    </label>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Old Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-md">
                    Change Password
                </button>
            </form>
        </div>
    );
}

export default Setting;
