const mongoose = require("mongoose");
const connection = require("./db")
const { isEmail } = require("validator")

const errHandelr = (e) => {
    console.log("hello, insert valid email")

}


const userSchema = new mongoose.Schema({

    name: {
        type: String,

        required: [true, "plese insert Name"],
        unique: [true, "That name is already taken"]
    },
    email: {
        type: String,
        required: [true, "please insert Email"],
        unique: [true, "that email is already taken"],
        validate: [isEmail, errHandelr]
    },
    password: {
        type: String,
        required: [true, "please insert password"]
    },
    verified: {
        type: Boolean
    },
    servers: {
        type: Array,
        of: Map
    },
    past_servers: {
        type: Array,
        of: Map
    }

});

const model = connection.model("userSchema", userSchema)

module.exports = model;