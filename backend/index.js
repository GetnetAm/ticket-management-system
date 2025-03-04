const express = require("express");
const bodyParser = require("body-parser");
const cors= require('cors');
const  mongoose = require("mongoose");
const cookiesParser= require("cookie-parser")
require("dotenv").config()
const app = express();

// const authRouter= require("./routes/auth")
const authRouter= require("./routes/auth")
// const departmentRouter= require("./routes/departmentRoute")
// const employeeRoute= require("./routes/employeeRoute")
// const salaryRoute= require("./routes/salaryRoute")
// const leaveRoute= require("./routes/leaveRoute")
// const settingRoute= require("./routes/settingRoute")




app.use(express.json());
app.use(cookiesParser());
// app.use(cors({
//    origin: process.env.FRONTEND_URL,
//    Credential: true,
// }))
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public/uploads'))


app.use('/api/auth', authRouter)
// app.use('/api/department', departmentRouter)
// app.use("/api/employee", employeeRoute)
// app.use("/api/salary", salaryRoute)
// app.use("/api/leave", leaveRoute)
// app.use("/api/setting", settingRoute)





const PORT = process.env.PORT || 5000;

mongoose

       .connect(process.env.MONGO_URI)
       .then(()=>console.log("mongo db is connecetd "))
       .catch((e)=> console.log(e))

app.listen(PORT, () => console.log("Server running on port " + PORT));