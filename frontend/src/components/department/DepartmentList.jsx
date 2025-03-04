import {Link } from "react-router-dom"
import DataTable from "react-data-table-component"
import { columns, DepartmenuButtons } from "../../utils/DepartmentHelper"
import { useEffect, useState } from "react"
import axios from "axios";
import Loader from "../loader/Loader";

function DepartmentList() {
    const [departments, setDepartments]= useState([]);
    const [depLoading, setDepLoading]= useState(false);
    const [filteredDepartments, setFIlteredDepartments]= useState([])


    const filterDepartment=(e)=>{
        const records= departments.filter((dep)=>
        dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFIlteredDepartments(records)

    }

    const onDepartmentDelete=async(id)=>{
        const data= departments.filter(dep=>dep._id !==id)
        setDepartments(data)
    }

    useEffect(()=>{
        const fetchDepartment= async()=>{
            setDepLoading(true)
            
            try {
                const response= await axios.get("http://localhost:5000/api/department/list", {
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem('token')}`
                    }
                })

                if(response.data.success){
                    let sno=1;
                    const data= await response.data.departments.map((dep)=>(
                        {
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: (<DepartmenuButtons DepId={dep._id} onDepartmentDelete={onDepartmentDelete} />)
                        }
                    ))
                    setDepartments(data);
                    setFIlteredDepartments(data);

                }
                
            } catch (error) {
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }

            }finally{
                setDepLoading(false)
            }
        }
        fetchDepartment();

    }, [])
    return (
        <>
        {depLoading ? <div className="m-12 text-center justify-center"><Loader /></div> : 
      
        <div className="p-5">
           <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
           </div>

           <div className="flex justify-between items-center">
            <input type="text" placeholder="Search By Dep Name" onChange={filterDepartment} />
            <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-teal-600 rounded text-white">Add New Department
            </Link>

           </div>

           <div>
            <DataTable columns={columns} data={filteredDepartments} />
           </div>
        </div>
        }
        </>
    )
}

  
export default DepartmentList
