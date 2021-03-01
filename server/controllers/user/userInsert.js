const router = require("express").Router()
const User = require("../../models/user/config.model")
const bcrypt = require("bcrypt")

router.post("/", async(req, res)=>{
    console.log(req.body.data)
    res.send("data recived")

    // errHandler
    const errHandler = (err)=>{
    if (err.code === 11000){
        return "This name is already taken"
    }else{
        return err.message
    }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.data.password, salt)


    const user = new User({
        name: req.body.data.name,
        email: req.body.data.email,
        password: hashedPass
    })
    await user.save((err, doc) =>{
        if(!err){
            console.log("saving...")
            console.log("saved!")
        }else{
            console.log("Error occured during record insertion: ", errHandler(err));
        }
    });
})

module.exports = router;