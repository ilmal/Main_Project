const mongoose = require("mongoose");
let request = require('request');

// console.log(process.env.DB_minecraftConfig_Connect)

//creating a restartFunc
// const restart = ()=>{
//     connection()
// }

//connection to the mongo db
const connection = mongoose.createConnection(process.env.DB_minecraftConfig_Connect, { useNewUrlParser: true, useFindAndModify: false }, (err)=>{
    if(!err){
        console.log("connection to db: minecraftConfig was a success");
    }else{
        console.log("error with connection to db: ", err);

        const ipReq = {
            'method': 'POST',
            'url': `${process.env.K8SAPI}/mongoip`,
        };
        request(ipReq)
        console.log("req sent")
    }
});

module.exports = connection
require("./config.model.js")