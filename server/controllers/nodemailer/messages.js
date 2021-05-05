const router = require("express").Router()
const nodemailer = require("nodemailer")

router.post("/", async (req, res) => {
    console.log("!!!THIS IS A WORKING MESSAGE!!!")
    const testAccount = await nodemailer.createTestAccount()

    console.log("testAccount uName:", testAccount.user)
    console.log("testAccount Pass:", testAccount.pass)

    console.log("content: ", req.body.content)

    res.send("request to <message> is taken care of")

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nils@u1.se", // generated ethereal user
            pass: "Charlotta1.1", // generated ethereal password
        },
    });


    const info = await transporter.sendMail({
        from: "nils@u1.se", // sender address
        to: "mini@u1.se", // list of receivers
        subject: req.body.type, // Subject line
        html: `<p>${req.body.content}</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
})



module.exports = router