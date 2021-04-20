const router = require("express").Router();
const request = require('request-promise');

const logs = name => {
    const config = {
        'method': 'GET',
        'url': `http://192.168.1.2:8081/api/v1/namespaces/mc-servers/pods/${name}/log`,
    }

    console.log("name of server: ", name)

    return request(config).then(response => {
        return response
    })
}

router.post("/pods", async (req, res) => {
    const config = {
        'method': 'GET',
        'url': 'http://192.168.1.2:8081/api/v1/namespaces/mc-servers/pods',
    }

    const podStatus = await request(config).then(response => {
        const data = JSON.parse(response)

        for (let i = 0; i < data.items.length; i++) {
            const element = data.items[i];
            if (element.metadata.name.includes(req.body.id)) {
                console.log("server found, sending successfull data now!")
                if (element.status.phase === "Pending") {
                    return {
                        status: "Pending",
                        podName: null
                    }
                }
                console.log("NAME!!!:", element.metadata.name)
                return {
                    status: element.status.conditions[1].status,
                    podName: element.metadata.name
                }
            }
        }
        console.log("server not found, sending closed status!")
        res.send({
            status: "server not running"
        }).end()
    })

    if (podStatus) {
        let logsData = "server's not running at the moment"
        if (podStatus.podName !== null) {
            logsData = await logs(podStatus.podName)
        }

        console.log("THIS IS THE REQ: ", podStatus.status)

        res.send({
            status: podStatus.status,
            logs: logsData
        }).end()
    }
})

router.post("/svc", (req, res) => {
    const config = {
        'method': 'GET',
        'url': 'http://192.168.1.2:8081/api/v1/namespaces/mc-servers/services',
    }

    request(config, (err, response) => {
        try {
            const data = JSON.parse(response.body)
            for (let i = 0; i < data.items.length; i++) {
                const element = data.items[i];
                console.log(element.metadata.labels.app)
                if (element.metadata.labels.app.includes(req.body.id)) {
                    console.log("server found, sending successfull SVC-DATA now!")
                    console.log(element.spec.ports[0].nodePort)
                    res.send({
                        port: element.spec.ports[0].nodePort
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
            throw "Server is not running!"
        } catch (error) {
            console.log(error)
        }
    })
})

module.exports = router;