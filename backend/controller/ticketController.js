const Employee = require("../models/employee");
const Ticket = require("../models/Ticket");

const addTicket = async (req, res) => {
    try {
        const { userId, TicketType, startDate, endDate, reason } = req.body;

       
        if (!userId || !TicketType || !startDate || !endDate || !reason) {
            return res.status(400).json({ success: false, error: "All fields are required." });
        }

  
        const employee = await Employee.findOne({ userId });
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found." });
        }

        const newTicket = new Ticket({
            employeeId: employee._id,
            TicketType,
            startDate,
            endDate,
            reason,
        });

        await newTicket.save();
        return res.status(200).json({ success: true, message: "Ticket request submitted successfully." });
    } catch (error) {
        console.error("Error adding Ticket:", error.message); // Log the actual error
        return res.status(500).json({ success: false, error: "Server error while submitting Ticket." });
    }
};


const getTicket = async (req, res) => {
  try {
    const { id } = req.params; 
    const employee = await Employee.findOne({ userId: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found." });
    }

  
    const Tickets = await Ticket.find({ employeeId: employee._id });

    if (Tickets.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Ticket records found for this employee.",
        Tickets: [],
      });
    }

    // Return the Ticket records
    return res.status(200).json({ success: true, Tickets });
  } catch (error) {
    // Improved error logging
    console.error(
      `Error fetching Tickets for employee ID ${req.params.id}:`,
      error.message
    );

    return res.status(500).json({
      success: false,
      error: "An internal server error occurred while fetching Ticket records.",
    });
  }
};





const getTickets = async (req, res) => {
    try {
      const Tickets = await Ticket.find().populate({
        path: "employeeId",
        populate: [
          {
            path: "department",
            select: "dep_name",
          },
          {
            path: "userId",
            select: "name",
          },
        ],
      });
  
      if (!Tickets || Tickets.length === 0) {
        return res.status(404).json({ success: false, error: "No Tickets found" });
      }
  
      return res.status(200).json({ success: true, Tickets });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error.message || "Server error" });
    }
  };


  
// const getTicketDetails = async (req, res) => {

//     try {
//       const Ticket = await Ticket.findById({_id: id}).populate({
//         path: "employeeId",
//         populate: [
//           {
//             path: "department",
//             select: "dep_name",
//           },
//           {
//             path: "userId",
//             select: "name, profileImage"
//           },
//         ],
//       });
  
//       if (!Ticket || Ticket.length === 0) {
//         return res.status(404).json({ success: false, error: "No Tickets found" });
//       }
  
//       return res.status(200).json({ success: true, Ticket });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ success: false, error: error.message || "Server error" });
//     }
//   };


const getTicketDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract `id` from request params

    // Fetch the Ticket by ID with populated fields
    const Ticket = await Ticket.findById(id).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name profileImage", // Corrected the select format
        },
      ],
    });

    // Check if the Ticket was found
    if (!Ticket) {
      return res.status(404).json({ success: false, error: "Ticket not found" });
    }

    // Return the Ticket details
    return res.status(200).json({ success: true, Ticket });
  } catch (error) {
    console.error("Error fetching Ticket details:", error.message); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, error: "An internal server error occurred" });
  }
};





// const updateTicket= async(req, res)=>{
//   try {
//     const {id}=req.params;
//     const Ticket= await Ticket.findByIdAndUpdate({_id: id}, {status: req.body.status})
//     if(!Ticket){
//       return res.status(404).json({success: false, error: "Ticket not founded"})
//     }
//     return res.status(200).json({success: true})
//   } catch (error) {
//     console.log(error.message)
//     return res.status(500).json({success: false, error: "Ticket update Server error"})
    
//   }

// }

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const Ticket = await Ticket.findByIdAndUpdate(
      id, 
      { status: req.body.status }, 
      { new: true } // Return the updated document
    );

    if (!Ticket) {
      return res.status(404).json({ success: false, error: "Ticket not found" });
    }

    return res.status(200).json({ success: true, data: Ticket });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: "Ticket update server error" });
  }
};



module.exports = {addTicket, getTicket, getTickets, getTicketDetails, updateTicket};