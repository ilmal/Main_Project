const mongoose = require("mongoose");
const connection = require("./db")
const { isEmail } = require("validator")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        
        required: [true, "plese insert Name"],
        unique: [true, "That name is already taken"],
        maxlength: [16, "Your name can't be longer than 16 letters"]
    },
    email: {
        type: String,
        required: [true, "please insert Email"],
        unique: [true, "that name is already taken"],
        validate: [isEmail, "please insert a valid Email"]
    },
    password: {
        type: String,
        required: [true, "please insert password"],
        minlength: [8, "please insert password with more than 8 letters"]
    },

    
});

const model = connection.model("userSchema", userSchema)

module.exports = model;