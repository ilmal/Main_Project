const router = require("express").Router()
var ObjectId = require('mongodb').ObjectID;

const User = require("../../models/user/config.model")

const Products = require("../../models/user/config.modelProducts")

router.post("/", async (req, res) => {
    const oid = ObjectId(req.body.id)

    // if email exists
    const user = await User.findOne({ _id: oid })
    if (!user || user === "null") {
        console.log("user does not exist (/user/user.js)")
        res.send("This user doesn't exist")
    } else {
        console.log("You are: ", user.name)
        res.send({
            name: user.name,
            email: user.email
        })
    }
})

module.exports = router