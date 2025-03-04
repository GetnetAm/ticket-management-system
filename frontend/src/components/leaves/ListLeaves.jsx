
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function ListLeaves() {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [error, setError] = useState(null); // For better error handling
    let sno = 1;
    

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/list/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                setLeaves(response.data.leaves); // Corrected from `response.data.leave`
            } else {
                setError(response.data.error || "Failed to fetch leaves.");
            }
        } catch (error) {
            const message = error.response?.data?.error || "An unexpected error occurred.";
            setError(message);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    return (
        <div className="p-5">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>

            <div className="flex justify-between items-center my-4">
                <input type="text" placeholder="Search By Name" />
                <Link
                    to="/employee-dashboard/add-leave"
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Add New Leave
                </Link>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                    <tr>
                        <th className="px-6 py-3">SNO</th>
                        <th className="px-6 py-3">Leave Type</th>
                        <th className="px-6 py-3">From</th>
                        <th className="px-6 py-3">To</th>
                        <th className="px-6 py-3">Reason</th>
                        <th className="px-6 py-3">Applied Date</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {leaves.length > 0 ? (
                        leaves.map((leave) => (
                            <tr
                                key={leave._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-3">{sno++}</td>
                                <td className="px-6 py-3">{leave.leaveType}</td>
                                <td className="px-6 py-3">
                                    {new Date(leave.startDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-3">
                                    {new Date(leave.endDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-3">{leave.reason}</td>
                                <td className="px-6 py-3">
                                    {new Date(leave.appliedAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-3">{leave.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-3">
                                No leaves found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListLeaves;



// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// //  import { useAuth } from "../../context/authContext";

// function ListLeaves() {
//     //  const { user } = useAuth();
//     const [leaves, setLeaves] = useState(null);
//     const [error, setError] = useState(null); // For better error handling
//     let sno = 1;

//     const {id}= useParams();
    

//     const fetchLeaves = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/leave/list/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });

//             if (response.data.success) {
//                 setLeaves(response.data.leaves); // Corrected from `response.data.leave`
//             } else {
//                 setError(response.data.error || "Failed to fetch leaves.");
//             }
//         } catch (error) {
//             const message = error.response?.data?.error || "An unexpected error occurred.";
//             setError(message);
//         }
//     };

//     useEffect(() => {
//         fetchLeaves();
//     }, []);

//     if(!leaves){
//         return <div>Loading..</div>
//     }

//     return (
//         <div className="p-5">
//             <div className="text-center">
//                 <h3 className="text-2xl font-bold">Manage Leaves</h3>
//             </div>

//             <div className="flex justify-between items-center my-4">
//                 <input type="text" placeholder="Search By Name" />
//                 <Link
//                     to="/employee-dashboard/add-leave"
//                     className="px-4 py-1 bg-teal-600 rounded text-white"
//                 >
//                     Add New Leave
//                 </Link>
//             </div>

//             {error && <p className="text-red-500">{error}</p>}

//             <table className="w-full text-sm text-left text-gray-500">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
//                     <tr>
//                         <th className="px-6 py-3">SNO</th>
//                         <th className="px-6 py-3">Leave Type</th>
//                         <th className="px-6 py-3">From</th>
//                         <th className="px-6 py-3">To</th>
//                         <th className="px-6 py-3">Reason</th>
//                         <th className="px-6 py-3">Applied Date</th>
//                         <th className="px-6 py-3">Status</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {leaves.length > 0 ? (
//                         leaves.map((leave) => (
//                             <tr
//                                 key={leave._id}
//                                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//                             >
//                                 <td className="px-6 py-3">{sno++}</td>
//                                 <td className="px-6 py-3">{leave.leaveType}</td>
//                                 <td className="px-6 py-3">
//                                     {new Date(leave.startDate).toLocaleDateString()}
//                                 </td>
//                                 <td className="px-6 py-3">
//                                     {new Date(leave.endDate).toLocaleDateString()}
//                                 </td>
//                                 <td className="px-6 py-3">{leave.reason}</td>
//                                 <td className="px-6 py-3">
//                                     {new Date(leave.appliedAt).toLocaleDateString()}
//                                 </td>
//                                 <td className="px-6 py-3">{leave.status}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="7" className="text-center py-3">
//                                 No leaves found.
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ListLeaves;

