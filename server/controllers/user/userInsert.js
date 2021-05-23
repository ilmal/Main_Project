const router = require("express").Router()
const User = require("../../models/user/config.model")
const bcrypt = require("bcrypt")
const Confirm = require("./confirmation")

router.post("/", async (req, res) => {
    // errHandler
    const errHandler = async (err) => {
        if (err.code === 11000) {
            if (await User.findOne({ name: req.body.data.name })) {
                return "This name is already taken"
            } else if (await User.findOne({ email: req.body.data.email })) {
                return "This email is already taken"
            } else {
                return "This name or email is already taken"
            }
        } else {
            console.log(err.message)
            return "Something went wrong, hopefully this will be resolved shortly"
        }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.data.password, salt)


    const user = new User({
        name: req.body.data.name,
        email: req.body.data.email,
        password: hashedPass,
        verified: false
    })
    await user.save((err) => {
        if (!err) {
            console.log("saving...")
            console.log("saved!")
            Confirm(req.body.data.email)
            res.send("User created")
        } else {
            Promise.resolve(errHandler(err)).then(data => {
                console.log("Error occured during record insertion: ", data);
                res.send(data)
            })
        }
    });
})

module.exports = router;