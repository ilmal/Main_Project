const router = require("express").Router()
const nodemailer = require("nodemailer")

router.post("/", async (req, res) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAILADDRESS,
            pass: process.env.EMAILPASS
        },
    });

    const responseMessage = "Message sent!"

    const info = await transporter.sendMail({
        from: "servers.u1.se@gamil.com", // sender address
        to: "mini@u1.se", // list of receivers
        subject: `${req.body.type}, from user: ${req.body.userID}`, // Subject line
        html: `<p>${req.body.content}</p>`, // html body
    }).catch(err => {
        console.log(err)
        responseMessage = "something went wrong!"
    })

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send(responseMessage)
})



module.exports = router