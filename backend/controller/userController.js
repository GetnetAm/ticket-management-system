const User = require("../models/User");
const bcrypt = require("bcryptjs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addUser = async (req, res) => {
    try {
        const { name, email, userId, dob, gender, maritalStatus, designation, department, salary, password, role } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            userId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            profileImage: req.file ? req.file.filename : ""
        });
        
        await newUser.save();
        return res.status(200).json({ success: true, message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in adding user" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate("department");
        return res.status(200).json({ success: true, users });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while fetching users" });
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate("department");
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while fetching user" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, maritalStatus, designation, salary, department } = req.body;
        
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        
        user.name = name || user.name;
        user.maritalStatus = maritalStatus || user.maritalStatus;
        user.designation = designation || user.designation;
        user.salary = salary || user.salary;
        user.department = department || user.department;
        
        await user.save();
        return res.status(200).json({ success: true, message: "User updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while updating user" });
    }
};

const fetchUsersByDepId = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await User.find({ department: id });
        return res.status(200).json({ success: true, users });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while fetching users by department" });
    }
};

module.exports = { addUser, upload, getUsers, getUser, updateUser, fetchUsersByDepId };
