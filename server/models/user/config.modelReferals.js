const mongoose = require("mongoose");
const connection = require("./db")
const { isEmail } = require("validator")

const errHandelr = (e) => {
    console.log("hello, insert valid email")
}


const referals = new mongoose.Schema({

    ref_id: {
        type: String
    },
    discount: {
        type: String
    },
    past_orders: {
        type: Map,
        of: String
    }

});

const model = connection.model("referals", referals)

module.exports = model;