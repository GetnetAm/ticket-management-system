// const mongoose = require("mongoose");

// const userSchema= new mongoose.Schema({
//     name: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, required: true},
//     role: { type: String, enum: ["user", "admin"], default: "user" },
//     // role: {type: String, enum:["admin", "employee"], required: true},
//     profileImage: {type: String},
//     createdAt: {type: Date, default: Date.now},
//     updateAt: {type: Date,a default: Date.now},
// })

// const User= mongoose.model("User", userSchema)
// module.exports= User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profileImage: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, // FIXED: Corrected the field name
});

// Middleware to update 'updatedAt' on save
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
