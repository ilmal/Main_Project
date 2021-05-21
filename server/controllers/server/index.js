const router = require("express").Router()
let request = require('request');

router.post("/", async (req, res) => {
    let config

    if (req.body.action === "start") {
        config = {
            'method': 'POST',
            'url': 'http://192.168.1.2:1004/mc',
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
            'url': 'http://192.168.1.2:1004/mc',
            'headers': {
            },
            formData: {
                'mongoID': req.body.id,
                'minecraftCommand': 'delete'
            }
        };
    }

    request(config, (err, response) => {
        if (err) {
            console.log(err)
        } else {
            //console.log(response)
        }
    })
    res.send("OK")
})

module.exports = router;