

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const columns = [
  { name: "S No", selector: (row) => row.sno, width: "75px" },
  { name: "Emp ID", selector: (row) => row.employeeId, sortable: true, width: "100px" },
  { name: "Name", selector: (row) => row.name, width: "150px" },
  { name: "Leave Type", selector: (row) => row.leaveType, width: "140px" },
  { name: "Department", selector: (row) => row.department || "N/A", width: "150px" },
  { name: "Days", selector: (row) => row.days, width: "130px" },
  { name: "Status", selector: (row) => row.status, sortable: true, width: "150px" },
  { name: "Action", selector: (row) => row.action, width: "150px" },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  // const handleView= (id) => {
  //   navigate(`admin-dashboard/leaves_details/${id}`);
  // };

  return (
    <div className="flex space-x-3">
      {/* <button
        className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
        onClick={() => handleView(Id)}
      >
        View
        
      </button> */}

<button
        className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
        onClick={()=> navigate(`/admin-dashboard/leaves_details/${Id}`)}
      >
        View
      </button>
    </div>
  );
};

LeaveButtons.propTypes = {
  Id: PropTypes.string.isRequired,
};

