// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';



// function SalaryEmployee() {
//     const [salaries, setSalaries]= useState([]);
//     const [filterdSalaries, SetFilteredSalaries]= useState([]);
//     const {id}= useParams();
//     let sno=1;


    
   
//         const fetchSalaries= async()=>{
            
//             try {
//                 const response= await axios.get(`http://localhost:5000/api/salary/${id}`, {
//                     headers:{
//                         "Authorization":`Bearer ${localStorage.getItem('token')}`
//                     }
//                 })

//                 if(response.data.success){
                    
//                  setSalaries(response.data.salary)
//                  SetFilteredSalaries(response.data.salary);

//                 }
                
//             } catch (error) {
//                 if(error.response && !error.response.data.success){
//                     alert(error.response.data.error)
//                 }

//             }
//         }



//  useEffect(()=>{
//      fetchSalaries();

//     }, [])



//     const handleFilter=(e)=>{
//         const FilterRecords= salaries.filter((salary)=>(
//             salary.name.toLowerCase().includes(e.target.value.toLowerCase())
//         ))
//         SetFilteredSalaries(FilterRecords)
//     }
 
//     return (
//         <>
//         {filterdSalaries===null ? (<div>Loading......</div>):( 
      
//         <div className="p-5">
//            <div className="text-center">
//             <h3 className="text-2xl font-bold">View Salary History</h3>
//            </div>

//            <div className="flex justify-between items-center">
//             <input type="text" placeholder="Search hire"  onChange={handleFilter} />

//            </div>

//            {filterdSalaries.length >0 ?(
//             <table className="w-full text-sm text-left border-collapse border border-slate-500 ">
//                   {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200"></thead> */}
//                 <thead>
//                     <tr>
//                         <th className="px-6 py-3 border border-slate-600 ">SNO</th>
//                         <th className="px-6 py-3 border border-slate-600 ">Emp ID</th>
//                         <th className="px-6 py-3 border border-slate-600 ">Salary</th>
//                         <th className="px-6 py-3 border border-slate-600 ">Allowance</th>
//                         <th className="px-6 py-3 border border-slate-600  ">Deduction</th>
//                         <th className="px-6 py-3 border border-slate-600 ">Total</th>
//                         <th className="px-6 py-3 border border-slate-600 ">Pay Date</th>

//                     </tr>

//                 </thead>
//                 <tbody>
//                     {filterdSalaries.map((salary)=>(
//                         //  <tr key={salary.id} className="bg-white border-b-2 dark:bg-gray-800 dark: border-gray-700"></tr>
//                         <tr key={salary._id} className="border border-slate-700">
//                             <td className="px-6 py-3">{sno++}</td>
//                             <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
//                             <td className="px-6 py-3">{salary.basicSalary}</td>
//                             <td className="px-6 py-3">{salary.allowances}</td>
//                             <td className="px-6 py-3">{salary.deductions}</td>
//                             <td className="px-6 py-3">{salary.netSalary}</td>
//                             <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                            


//                         </tr>
//                     ))}
//                 </tbody>

//             </table>
//            ): <div>No Records </div>}

          
//         </div>

        
//         )
//          } 
//         </>
//     )
// }

// export default SalaryEmployee
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";

function SalaryEmployee() {
    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    let sno = 1;

    // Fetch Salaries from the Backend
    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                setSalaries(response.data.salary); // Set full salaries list
                setFilteredSalaries(response.data.salary); // Set initial filtered list
            } else {
                setError("Failed to fetch salaries");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Server Error");
        } finally {
            setLoading(false);
        }
    };

    // Fetch Data on Component Mount
    useEffect(() => {
        fetchSalaries();
    }, []);

    // Handle Search Filtering
    const handleFilter = (e) => {
        const query = e.target.value.toLowerCase();
        const filteredRecords = salaries.filter(
            (salary) =>
                salary.employeeId.employeeId.toLowerCase().includes(query) || // Search by Employee ID
                salary.basicSalary.toString().includes(query) || // Search by Basic Salary
                salary.allowances.toString().includes(query) // Search by Allowances
        );
        setFilteredSalaries(filteredRecords);
    };

    // Render Component
    if (loading) {
        return <div className="m-12 text-center justify-center"><Loader /></div> ;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-5">
            <div className="text-center">
                <h3 className="text-2xl font-bold">View Salary History</h3>
            </div>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search here"
                    className="px-4 py-2 border rounded"
                    onChange={handleFilter}
                />
            </div>

            {filteredSalaries.length > 0 ? (
                <table className="w-full text-sm text-left border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border border-slate-600">SNO</th>
                            <th className="px-6 py-3 border border-slate-600">Emp ID</th>
                            <th className="px-6 py-3 border border-slate-600">Salary</th>
                            <th className="px-6 py-3 border border-slate-600">Allowance</th>
                            <th className="px-6 py-3 border border-slate-600">Deduction</th>
                            <th className="px-6 py-3 border border-slate-600">Total</th>
                            <th className="px-6 py-3 border border-slate-600">Pay Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaries.map((salary) => (
                            <tr key={salary._id} className="border border-slate-700">
                                <td className="px-6 py-3">{sno++}</td>
                                <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                                <td className="px-6 py-3">{salary.basicSalary}</td>
                                <td className="px-6 py-3">{salary.allowances}</td>
                                <td className="px-6 py-3">{salary.deductions}</td>
                                <td className="px-6 py-3">{salary.netSalary}</td>
                                <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No Records Found</div>
            )}
        </div>
    );
}

export default SalaryEmployee;
