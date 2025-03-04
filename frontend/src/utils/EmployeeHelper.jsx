import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "55px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width:"130px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width:"130px"
 
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width:"130px"
   
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
  },

  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const fetchDepartment = async () => {
  let departments;
  try {
    const response = await axios.get(
      "http://localhost:5000/api/department/list",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return departments;
};


// employees for salary form

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:5000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return employees;
};








export const EmployeeMenuButtons = ({ EmpId }) => {

    const navigate= useNavigate();
  return (
    <div className="flex space-x-3">
      <button className="px-3 py-1 bg-teal-600 text-white" onClick={()=> navigate(`/admin-dashboard/employee_view/${EmpId}`)}>View</button>
      <button className="px-3 py-1 bg-blue-600 text-white"  onClick={()=> navigate(`/admin-dashboard/employee/edit/${EmpId}`)}>Edit</button>
      <button className="px-3 py-1 bg-yellow-600 text-white"  onClick={()=> navigate(`/admin-dashboard/employee/salary/${EmpId}`)}>Salary</button>
      <button className="px-3 py-1 bg-red-600 text-white" onClick={()=>navigate(`/admin-dashboard/employees/leaves/${EmpId}`)}>Leave</button>
      <button className="px-3 py-1 bg-red-600 text-white" >Leave</button>
      
    </div>
  );
};

EmployeeMenuButtons.propTypes = {
  // onDepartmentDelete: PropTypes.func.isRequired, // Must be a function
  EmpId: PropTypes.string.isRequired,
};
