import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function LeaveDetails() {
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/leave/detail/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) setLeave(response.data.leave);
      } catch (error) {
        const errorMessage = error.response?.data?.error || error.message || "An unexpected error occurred.";
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this leave?`)) return;
    try {
      const response = await axios.put(`http://localhost:5000/api/leave/update/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
      alert(errorMessage);
    }
  };

  return (
    <>
      {loading ? (
        <div className="m-3 text-center justify-center">
          <Loader />
        </div>
      ) : leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                className="rounded-full border w-72"
                src={`http://localhost:5000/${leave.employeeId?.userId?.profileImage || "default.png"}`}
                alt={`${leave?.employeeId?.userId?.name || "Employee"}'s profile`}
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{leave?.employeeId?.userId?.name || "N/A"}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{leave?.employeeId?.employeeId || "N/A"}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Leave Type:</p>
                <p className="font-medium">{leave?.leaveType || "N/A"}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Reason:</p>
                <p className="font-medium">{leave?.reason || "N/A"}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{leave?.employeeId?.department?.dep_name || "N/A"}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Start Date:</p>
                <p className="font-medium">{leave?.startDate ? new Date(leave.startDate).toLocaleDateString() : "N/A"}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">End Date:</p>
                <p className="font-medium">{leave?.endDate ? new Date(leave.endDate).toLocaleDateString() : "N/A"}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">{leave?.status === "Pending" ? "Action" : "Status:"}</p>
                {leave?.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-0.5 bg-teal-600 hover:bg-teal-700 text-white rounded"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p>{leave?.status || "N/A"}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-3 text-center justify-center">
          <p>No leave data found.</p>
        </div>
      )}
    </>
  );
}

export default LeaveDetails;
