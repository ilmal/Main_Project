const router = require("express").Router()
const YAML = require('js-yaml');
const mcConf = require("../../models/minecraftConfig/config.model")
const User = require("../../models/user/config.model")
var ObjectId = require('mongodb').ObjectID;


router.post("/", async (req, res) => {
    // loading user
    if (!req.body.id) return res.send("user id is null (at server mcConf getData)")
    const user = await User.findOne({ _id: ObjectId(req.body.id) })
    // cheking if user exist
    if (!user) {
        const errMessage = "no user found with ID: " + req.body.id + "at server mcConf getData"
        console.log(errMessage)
        return res.send(errMessage)
    }

    let responseData = []
    // getting data from all users servers

    if (user.servers.length === 0) res.send("user doesn't have any servers")
    await user.servers.forEach(async (element, index) => {
        // loading conf
        const conf = await mcConf.findOne({ id: element.get("server_id") })
        // checking if conf exists
        if (!conf) {
            const errMessage = "conf does not exist (mcConf.getData())"
            console.log(errMessage)
            return
        }

        // extracting data from database
        const deployment = YAML.load(conf.deployment)
        const serverData = deployment.spec.template.spec.containers[0].env

        const finalData = {
            server_id: element.get("server_id"),
            data: serverData
        }
        responseData.push(finalData)
        if (index === (user.servers.length - 1)) {
            // sending response data to frontend, containing server_id, and server data
            res.send(responseData)
        }
    })
})

module.exports = router