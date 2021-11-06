const router = require("express").Router()
const YAML = require('js-yaml');
const mcConf = require("../../models/minecraftConfig/config.model")

router.post("/", async (req, res) => {
    // if conf exists
    const conf = await mcConf.findOne({ id: req.body.id })
    if (!conf) {
        console.log("user does not exist (mcConf.getData())")
        return res.send("user does not exist, from getData")
    }

    let deployment = YAML.load(conf.deployment)
    const data = deployment.spec.template.spec.containers[0].env

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
    }

    res.send({
        env: deployment.spec.template.spec.containers[0].env
    })
})

module.exports = router