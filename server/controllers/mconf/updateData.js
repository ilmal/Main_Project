const router = require("express").Router()
const YAML = require('js-yaml');
const mcConf = require("../../models/minecraftConfig/config.model")

router.post("/", updateData = async (req, res) => {

    const conf = await mcConf.findOne({ id: req.body.id })
    if (!conf) {
        const errMessage = "config doesn't exist iwth id: " + req.body.id + " at server updateData"
        console.log(errMessage)
        return res.send(errMessage)
    }

    let deployment = YAML.load(conf.deployment)

    // creating new deployment
    if (req.body.serverName === "") {
        const serverName = req.body.serverName
    } else {
        const serverName = deployment.spec.template.spec.containers[0].env[4]
    }

    const newDeployment = deployment

    if (req.body.serverName === "") {
        console.log("ServerName req value was empty", deployment.spec.template.spec.containers[0].env[4].value)
        newDeployment.spec.template.spec.containers[0].env[4].value = deployment.spec.template.spec.containers[0].env[4].value //ServerName if req value if empty
    } else {
        newDeployment.spec.template.spec.containers[0].env[4].value = req.body.serverName //ServerName if req value has value
    }

    newDeployment.spec.template.spec.containers[0].env[3].value = req.body.serverVersion //version
    newDeployment.spec.template.spec.containers[0].env[5].value = req.body.serverDifficulty //Difficulty
    newDeployment.spec.template.spec.containers[0].env[6].value = req.body.serverWhitelist //whitelist
    newDeployment.spec.template.spec.containers[0].env[7].value = req.body.serverOpsList //ops

    const newDeploymentString = YAML.dump(newDeployment)

    conf.deployment = newDeploymentString

    await conf.save((err, doc) => {
        if (!err) {
            console.log("saving...")
            console.log("saved!")
        } else {
            console.log("Error occured during record insertion: ", err);
        }
    });

    console.log("updateData: ", req.body)

    res.send({
        data: "success"
    })
})

module.exports = router