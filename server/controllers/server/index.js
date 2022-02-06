const router = require("express").Router()
let request = require('request');
const Config = require("../../models/minecraftConfig/config.model")
const YAML = require('js-yaml');

router.post("/", async (req, res) => {
    let config = null

    console.log("REQ: ", req.body)

    const createSVC = async () => {
        const config = await Config.findOne({ id: req.body.id })

        const serviceYAML = YAML.load(config["service"])

        console.log("SENT DATA: \n", serviceYAML)

        reqConf = {
            'method': 'POST',
            'url': `${process.env.K8S_DEFAULT_API}/api/v1/namespaces/mc-servers/services/`,
            'headers': {
                "Content-Type": "application/yaml"
            },
            "body": YAML.dump(serviceYAML)
        }
        request(reqConf, (err, response) => {
            if (err) {
                console.log("ERR RESPONSE FROM CUTOM GO API at server.controllers.server.index.js", err)
            } else {
                console.log("RESPONSE FROM API REQ: ", response)
            }
        })
    }

    if (req.body.action === "start") {
        await createSVC()
        config = {
            'method': 'POST',
            'url': `${process.env.K8SAPI}/mc`,
            'headers': {
            },
            formData: {
                'mongoID': req.body.id,
                'minecraftCommand': 'create'
            }
        };
    } else if (req.body.action === "stop") {
        config = {
            'method': 'POST',
            'url': `${process.env.K8SAPI}/mc`,
            'headers': {
            },
            formData: {
                'mongoID': req.body.id,
                'minecraftCommand': 'delete'
            }
        };
    }

    if (!config) console.log("ERR, CONFIG NOT DEFINED at server.controllers.server.index.js")

    request(config, (err, response) => {
        if (err) {
            console.log("ERR RESPONSE FROM CUTOM GO API at server.controllers.server.index.js", err)
        } else {
            //console.log(response)
        }
    })
    res.send("OK")
})

module.exports = router;