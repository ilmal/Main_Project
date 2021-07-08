const router = require("express").Router()
const Confirm = require("./confirmation")
const User = require("../../models/user/config.model")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")


router.post("/", async (req, res) => {

    // getting user
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        console.log("cannot find user (updatepassmail)")
        return res.send({
            type: "err",
            payload: "there are no users with this email"
        })
    }

    //creating mail token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 3600
    })
    console.log("mailToken: ", token)

    const url = `${process.env.SERVER_ADRESS}/updatepass/${token}?_id=${user._id}`

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAILADDRESS,
            pass: process.env.EMAILPASS
        },
    });
    let responseMessage = "Message sent!"

    await transporter.sendMail({
        from: "servers.u1.se@gmail.com", // sender address
        to: req.body.email, // list of receivers
        subject: `Reset your ${process.env.SERVER_ADRESS} password here!`, // Subject line
        html: `<p>${url}</p>`, // html body
    }).catch(err => {
        console.log(err)
        responseMessage = "something went wrong!"
    })

    console.log("Message sent!")
    return ({
        type: "message",
        payload: responseMessage
    })
})

module.exports = router