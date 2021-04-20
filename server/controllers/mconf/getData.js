const router = require("express").Router()
const YAML = require('js-yaml');
const mcConf = require("../../models/minecraftConfig/config.model")

router.post("/", getData = async (req, res) => {

    // if email exists
    const conf = await mcConf.findOne({ id: req.body.id })
    if (!conf) {
        console.log("user does not exist3")
        return res.status(400)
    }

    let deployment = YAML.load(conf.deployment)
    const data = deployment.spec.template.spec.containers[0].env

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        console.log(element)
    }

    res.send({
        env: deployment.spec.template.spec.containers[0].env
    })
})

module.exports = router