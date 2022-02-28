const router = require("express").Router()
const ObjectId = require('mongodb').ObjectID;
const YAML = require('js-yaml');

const User = require("../../models/user/config.model")
const Config = require("../../models/minecraftConfig/config.model")

const getServerNames = (past_servers) => {
    let returnArray = []
    const config = Config.find()
    for (let i = 0; i < past_servers.length; i++) {
        const past_server = past_servers[i];
        for (let i = 0; i < config.length; i++) {
            const server = config[i];
            if (server._id != past_server._server_id) continue
            const deployment = YAML.load(server.deployment)

            returnArray.append({
                ...past_server,
                server_name: deployment.spec.template.spec.containers[0].env[4].value
            })
        }
    }

}

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
    }

    let returnData = {
        name: user.name,
        email: user.email,
        past_servers: user.past_servers,
        servers: user.servers
    }

    const serverNames = getServerNames(user.past_servers)
    if (serverNames) {

    }
    console.log("You are: ", user.name)
    res.send(returnData)
})

module.exports = router