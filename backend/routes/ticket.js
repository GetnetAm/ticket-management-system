
const express = require("express");
const { updateTicket, getTickets, getTicket, addTicket } = require("../controller/ticketController");
const router= express.Router();


router.post("/add",  addTicket);
router.get("/list/:id",  getTicket);
router.get("/lists",  getTickets);
router.get("/detail/:id",  getTicketDetails);
router.put("/update/:id",  updateTicket);



module.exports= router;


