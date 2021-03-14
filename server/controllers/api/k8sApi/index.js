const router = require("express").Router();
const request = require('request');

router.post("/pods", (req, res) => {
    const config = {
        'method': 'GET',
        'url': 'http://192.168.1.2:8081/api/v1/namespaces/default/pods',
    }

    // let date_ob = new Date();

    // console.log("current time: ", date_ob.getDate(), date_ob.getHours(), date_ob.getMinutes(), date_ob.getSeconds())

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
                        if (data.items[0].status.phase === "Pending") {
                            res.send({
                                status: "Pending"
                            })
                        }
                        res.send({
                            status: data.items[0].status.conditions[1].status
                        })
                        res.end()
                        throw "server found, exit function"
                    }
                    console.log("server not found, sending closed status!")
                    res.send({
                        status: "server not running"
                    })
                    res.end()
                }
            } catch (error) {
                // console.log(error)
            }
        }
    })
})

router.post("/svc", (req, res) => {
    const config = {
        'method': 'GET',
        'url': 'http://192.168.1.2:8081/api/v1/namespaces/default/services',
    }

    request(config, (err, response) => {
        if (err) {
            console.log(err)
        } else {
            try {
                const data = JSON.parse(response.body)
                console.log("data: ", data.items[0].spec.ports[0].nodePort)
                for (let i = 0; i < data.items.length; i++) {
                    const element = data.items[i];
                    const value = element.metadata.labels.app
                    if (element.metadata.labels.app.includes(req.body.id)) {
                        console.log("server found, sending successfull data now!")
                        res.send({
                            port: data.items[0].spec.ports[0].nodePort
                        })
                        res.end()
                        throw "server found, exit function"
                    }
                }
                console.log("server not found, no port!")
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