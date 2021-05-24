const router = require("express").Router();
const request = require('request-promise');

const logs = async (name) => {
    const config = {
        'method': 'GET',
        'url': `http://192.168.1.2:8081/api/v1/namespaces/mc-servers/pods/${name}/log`,
    }

    return request(config).then(response => {
        // break the textblock into an array of lines
        var lines = response.split('\n');

        //removing the messages that should get removed
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].indexOf("Can't keep up! Is the server overloaded?") > -1 || lines[i].indexOf(" Mismatch in destroy block pos:") > -1) {
                console.log(lines[i])
                lines.splice(i)
            }

        }

        // join the array back into a single string
        var newtext = lines.join('\n');

        return newtext
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
                return {
                    status: element.status.conditions[1].status,
                    podName: element.metadata.name
                }
            }
        }
        console.log("server not found, sending closed status!")
        res.send({
            status: "server not running",
            logs: "server not running"
        }).end()
    })

    if (podStatus) {
        let logsData = "server's not running at the moment (starting up)"
        if (podStatus.podName !== null) {
            logsData = await logs(podStatus.podName)
        }
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