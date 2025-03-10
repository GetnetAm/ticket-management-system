import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartment } from "../../utils/UserHelper";

function EditEmployee() {
    const [employee, setEmployee]= useState({
        name: '',
        maritalStatus:'',
        designation: '',
        salary:'',
        department:''
    });
    const [departments, setDepartments]= useState([]);
    const {id}= useParams()
    const navigate= useNavigate()



    useEffect(()=>{
        const getDepartments= async()=>{
            const departments= await fetchDepartment();
            setDepartments(departments)
        };
        getDepartments();

    }, [])
    useEffect(()=>{
        const fetchEmployee= async()=>{

            
            try {
                const response= await axios.get(`http://localhost:5000/api/employee/list/${id}`,
                    employee, {
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem('token')}`
                    }
                })

                if(response.data.success){
                    const employee=response.data.employee;
                    setEmployee((prev)=>({
                        ...prev,
                        name: employee.userId.name,
                        maritalStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department
                    }))
               
                    

                }
                
            } catch (error) {
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }

            }
        }
        fetchEmployee();

    }, [])

    const handleChange=(e)=>{
        const {name, value}=e.target;
            setEmployee((prevData)=>({...prevData, [name]: value}))
        
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response= await axios.put(`http://localhost:5000/api/employee/edit/${id}`, employee, {
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            })


            if (response.data.success) {
              navigate("/admin-dashboard/employees");
            }
            
        } catch (error) {
            if(error.response && !error.response.data.error){
                alert(error.response.data.error)
            }
        }
    }
    return (
        <>{departments && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
  
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md: grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                placeholder="Insert Name"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
  
          
  
  
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Marital Status
              </label>
              <select name="maritalStatus"
              onChange={handleChange}
              value={employee.maritalStatus}
              className="mt-1 p-2 block w-full border border-gray-300 rounded">
  
            
              <option value="">Select Status</option>
              <option value="male">Single</option>
              <option value="male">Married</option>
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                value={employee.designation}
                name="designation"
                onChange={handleChange}
                placeholder="Designation"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
  
          
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="number"
                value={employee.salary}
                name="salary"
                onChange={handleChange}
                placeholder="Salary"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
              Department
              </label>
              <select name="department"
              value={employee.department}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              required>
  
            
              <option value="">Select Department</option>
              {
                  departments.map((dep)=>(
                      <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                  ))
              }
              
              
              </select>
            </div>
  
  
  
          </div>
  
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md">
              Edit Employee
          </button>
        </form>
      </div>

): <div>Loding...</div>}</>
    )
}

export default EditEmployee
