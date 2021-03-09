const router = require("express").Router();
const request = require('request');

router.post("/", (req, res) => {
    console.log("welcome to the api hanlder", req.body.id)

    const config = {
        'method': 'GET',
        'url': 'http://192.168.1.2:8081/api/v1/namespaces/default/pods',
    }

    request(config, (err, response) => {
        if (err) {
            console.log(err)
        } else {
            try {
                const data = JSON.parse(response.body)
                console.log("data: ", data.items[0].status.conditions[1].status)
                for (let i = 0; i < data.items.length; i++) {
                    const element = data.items[i];
                    const value = element.metadata.name
                    if (element.metadata.name.includes(req.body.id)) {
                        console.log("server found, sending successfull data now!")
                        res.send({
                            status: data.items[0].status.conditions[1].status
                        })
                        res.end()
                        throw "server found, exit function"
                    }
                }
                console.log("server not found, sending closed status!")
                res.send({
                    status: "server not running"
                })
                res.end()
            } catch (error) {

            }

        }
    })
})

module.exports = router;