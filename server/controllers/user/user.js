const router = require("express").Router()
var ObjectId = require('mongodb').ObjectID;

const User = require("../../models/user/config.model")

router.post("/", async (req, res) => {

    if (!req.body.id) return res.send("no user id (at server user.user)")
    console.log("req.body.id: ", req.body.id)
    const oid = ObjectId(req.body.id)
    console.log("OID: ", oid)
    // if email exists
    const user = await User.findOne({
        _id: ObjectId(req.body.id)
    })
    if (!user || user === "null") {
        console.log("user does not exist (/user/user.js)")
        res.send("This user doesn't exist")
    } else {
        console.log("You are: ", user.name)
        res.send({
            name: user.name,
            email: user.email,
            past_servers: user.past_servers,
            servers: user.servers
        })
    }
})

module.exports = router