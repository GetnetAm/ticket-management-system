import { useEffect, useState } from "react";
import { columns, TicketButtons } from "../../utils/ticketHelper";
import axios from "axios";
import DataTable from "react-data-table-component";
import Loader from "../loader/Loader";

function Table() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTicket = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ticket/lists", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.tickets.map((ticket) => ({
          key: ticket._id, // Add unique key
          _id: ticket._id,
          sno: sno++,
          employeeId: ticket.employeeId?.employeeId || "N/A",
          name: ticket.employeeId?.userId?.name || "N/A",
          ticketType: ticket.ticketType || "N/A",
          department: ticket.employeeId?.department?.dep_name || "N/A",
          days: Math.abs(
            (new Date(ticket.endDate) - new Date(ticket.startDate)) / (1000 * 60 * 60 * 24)
          ),
          status: ticket.status || "Pending",
          action: <TicketButtons Id={ticket._id} />,
        }));
        setTickets(data);
        setFilteredTickets(data);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error.message);
      alert(error.response?.data?.error || "Failed to fetch ticket data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  // Update filtered leaves based on search query and status
  useEffect(() => {
    let updatedLeaves = tickets;

    if (searchQuery) {
      updatedLeaves = updatedLeaves.filter(
        (leave) =>
          leave.employeeId.toLowerCase().includes(searchQuery) ||
          leave.name.toLowerCase().includes(searchQuery)
      );
    }

    if (filterStatus) {
      updatedTickets = updatedTickets.filter((ticket) =>
        ticket.status.toLowerCase().includes(filterStatus.toLowerCase())
      );
    }

    setFilteredTickets(updatedTickets);
  }, [searchQuery, filterStatus, tickets]);

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
            <h3 className="text-2xl font-bold">Manage tickets</h3>
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
            <DataTable columns={columns} data={filteredTickets} pagination />
          </div>
        </div>
      )}
    </>
  );
}

export default Table;


