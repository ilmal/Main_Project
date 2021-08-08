const mongoose = require("mongoose");
const connection = require("./db")
const { isEmail } = require("validator")

const errHandelr = (e) => {
    console.log("hello, insert valid email")

}


const products = new mongoose.Schema({

    game: {
        type: String
    },
    basic: {
        type: Map,
        of: String
    },
    normal: {
        type: Map,
        of: String
    },
    premium: {
        type: Map,
        of: String
    },

});

const model = connection.model("products", products)

module.exports = model;