import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmenuButtons = ({ DepId, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("Are You want to Delete this??");
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/department/delete/${DepId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          onDepartmentDelete(DepId);
          alert("You Are Successfully Deleted The Item");
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          alert(error.response.data.error);
        }
      }
    }
  };
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

DepartmenuButtons.propTypes = {
  onDepartmentDelete: PropTypes.func.isRequired, // Must be a function
  DepId: PropTypes.string.isRequired,
};
