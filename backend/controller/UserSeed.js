const User = require("../models/User")
const bcrypt= require("bcryptjs")

const userRegister= async(req, res)=>{
   const {name, email, password, role}= req.body;
   const hashPassword= bcrypt.hashSync(password, 10);
   const newUser= new User({name, email, password: hashPassword, role});
   await newUser.save();
   res.status(201).json("User created successfully")
}


module.exports=userRegister



