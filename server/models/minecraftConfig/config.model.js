const mongoose = require("mongoose");
const connection = require("./db")

const configSchema = new mongoose.Schema({

    id: {
        type: String
    },
    pvc: {
        type: String
    },
    deployment: {
        type: String
    },
    service: {
        type: String
    }
    
},);

const model = connection.model("configSchema", configSchema)

module.exports = model;
