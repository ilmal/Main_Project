const User = require("../../models/user/config.model")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")

const Confirm = async (email) => {
    // if name exists
    const user = await User.findOne({ email })
    if (!user) {
        console.log("User does not exist")
        return ({
            type: "err",
            payload: "User does not exist"
        })
    }
    //if user already verified (this should never be possible, biut still :) )
    if (user.verified) {
        console.log("User already verified")
        return ({
            type: "err",
            payload: "User already verified"
        })
    }

    //creating mail token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 3600
    })
    console.log("mailToken: ", token)

    const url = `servers.u1.se/confirmation/${token}?_id=${user._id}`

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAILADDRESS,
            pass: process.env.EMAILPASS
        },
    });
    const responseMessage = "Message sent!"

    const info = await transporter.sendMail({
        from: "servers.u1.se@gmail.com", // sender address
        to: email, // list of receivers
        subject: `Activate you Servers.u1.se account here`, // Subject line
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
}

module.exports = Confirm