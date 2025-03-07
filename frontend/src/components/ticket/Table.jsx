import { useEffect, useState } from "react";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";
import DataTable from "react-data-table-component";
import Loader from "../loader/Loader";

function Table() {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave/lists", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          key: leave._id, // Add unique key
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.userId?.name || "N/A",
          leaveType: leave.leaveType || "N/A",
          department: leave.employeeId?.department?.dep_name || "N/A",
          days: Math.abs(
            (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
          ),
          status: leave.status || "Pending",
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error.message);
      alert(error.response?.data?.error || "Failed to fetch leave data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Update filtered leaves based on search query and status
  useEffect(() => {
    let updatedLeaves = leaves;

    if (searchQuery) {
      updatedLeaves = updatedLeaves.filter(
        (leave) =>
          leave.employeeId.toLowerCase().includes(searchQuery) ||
          leave.name.toLowerCase().includes(searchQuery)
      );
    }

    if (filterStatus) {
      updatedLeaves = updatedLeaves.filter((leave) =>
        leave.status.toLowerCase().includes(filterStatus.toLowerCase())
      );
    }

    setFilteredLeaves(updatedLeaves);
  }, [searchQuery, filterStatus, leaves]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleFilterByStatus = (status) => {
    setFilterStatus(status);
  };

  return (
    <>
      {loading ? (
        <div className="m-12 text-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search by ID or Name"
              className="px-4 py-0.5 border"
              onChange={handleSearch}
            />

            <div className="space-x-3">
              <button
                className="px-2 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => handleFilterByStatus("Pending")}
              >
                Pending
              </button>
              <button
                className="px-2 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => handleFilterByStatus("Approve")}
              >
                Approve
              </button>
              <button
                className="px-2 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => handleFilterByStatus("Rejected")}
              >
                Rejected
              </button>
              <button
                className="px-2 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => handleFilterByStatus("")}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-3">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      )}
    </>
  );
}

export default Table;


