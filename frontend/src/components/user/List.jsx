import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeMenuButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import Loader from "../loader/Loader";

function List() {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filterdEmployee, SetFilterdEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      setEmpLoading(true);

      try {
        const response = await axios.get(
          "http://localhost:5000/api/employee/list",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toDateString(),
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:5000/${emp.userId.profileImage}`}
              />
            ),

            action: <EmployeeMenuButtons EmpId={emp._id} />,
          }));
          setEmployees(data);
          SetFilterdEmployee(data);
          // setFIlteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    SetFilterdEmployee(records);
  };

  return (
    <>
      {empLoading ? (
        <div className="m-12 text-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Dep Name"
              onChange={handleFilter}
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Employees
            </Link>
         
          </div>


          <div>
            <DataTable columns={columns} data={filterdEmployee} pagination />
          </div>
        </div>
      )}
    </>
  );
}

export default List;
