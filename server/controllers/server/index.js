const router = require("express").Router()
let request = require('request');

router.post("/", async (req, res) => {
    let config = null

    console.log("REQ: ", req.body)

    if (req.body.action === "start") {
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