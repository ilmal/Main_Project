const router = require("express").Router()
const User = require("../../models/user/config.model")
const bcrypt = require("bcrypt")
const authToken  = require("../../jwt/verifyToken")


router.post("/", async(req, res)=>{
    
    // if email exists
    const user = await User.findOne({name: req.body.name})
    if(!user){
        console.log("user does not exist")
        return res.status(400)
    } 
    // if pass is correct
    const pass = await bcrypt.compare(req.body.password, user.password)
    if(!pass){
        console.log("pass not valid")
        return res.status(400)
    }

    res.send({
        data:"success"
    })

    console.log("login success")
    console.log(req.headers.cookie)
})

module.exports = router