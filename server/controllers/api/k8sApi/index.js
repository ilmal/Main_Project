const router = require("express").Router();
const request = require('request-promise');

const logs = async (name) => {
    const config = {
        'method': 'GET',
        'url': `${process.env.K8S_DEFAULT_API}/api/v1/namespaces/mc-servers/pods/${name}/log`,
    }

    return request(config).then(response => {
        // break the textblock into an array of lines
        var lines = response.split('\n');

        //removing the messages that should get removed
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].indexOf("Can't keep up! Is the server overloaded?") > -1 ||                                        //preformance
                lines[i].indexOf("Mismatch in destroy block pos:") > -1 ||                                                  //preformance
                lines[i].indexOf("[init] Setting initial memory to") > -1 ||                                                //spec details
                lines[i].indexOf("[Autopause loop]") > -1 ||                                                                //autopause
                lines[i].indexOf("[RCON Client /127.0.0.1 #2/INFO]: Thread RCON Client /127.0.0.1 shutting down") > -1 ||   //autopause
                lines[i].indexOf("[RCON Listener #1/INFO]: Thread RCON Client /127.0.0.1 started") > -1 ||                  //autopause
                lines[i].indexOf("[Server thread/INFO]: [Rcon: Saved the game]") > -1) {                                    //autopause

                lines.splice(i, 1)
            }

        }

        // join the array back into a single string
        var newtext = lines.join('\n');
        return newtext
    })
}

const clusterQueFunc = (data, id) => {

    // building the que
    let queArr = []

    //getting all pods
    for (let i = 0; i < data.items.length; i++) {
        const element = data.items[i];
        // check how many pods are good to be set in que
        // exiting if pods dosn't have message
        if (element.status.conditions[0].message != undefined) {
            if (element.status.conditions[0].message.indexOf("Insufficient memory") > -1 ||
                element.status.conditions[0].message.indexOf("Insufficient cpu") > -1) {
                // adding pods to the que
                queArr.push({ name: element.metadata.labels.app, time: element.metadata.creationTimestamp })
            }
        }
    }
    // sorting the que after time
    queArr.sort((a, b) => {
        return (a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0)
    })

    let position = null

    // setting the position
    for (let i = 0; i < queArr.length; i++) {
        if (queArr[i].name === id) {
            position = i + 1
        }
    }

    // checking that nothing went wrong, adn returning
    if (position != null) {
        return `Your position in the que is: ${position}`
    } else {
        return "Something went wrong with calculating que"
    }
}

router.post("/pods", async (req, res) => {
    const config = {
        'method': 'GET',
        'url': `${process.env.K8S_DEFAULT_API}/api/v1/namespaces/mc-servers/pods`,
    }

    const podStatus = await request(config).then(response => {
        const data = JSON.parse(response)

        // getting the pods
        for (let i = 0; i < data.items.length; i++) {
            const element = data.items[i];
            //getting a specific pod
            if (element.metadata.name.includes(req.body.id)) {
                if (element.status.phase === "Pending") {
                    // if k8s cluster is full
                    // exiting if pods dosn't have message
                    if (element.status.conditions[0].message != undefined) {
                        if (element.status.conditions[0].message.indexOf("Insufficient memory") > -1 ||
                            element.status.conditions[0].message.indexOf("Insufficient cpu") > -1) {

                            return {
                                status: "Queuing",
                                podName: null,
                                queuing: clusterQueFunc(data, req.body.id)
                            }
                        }
                    }

                    // returning so that logsData (se below) isn't updated
                    return {
                        status: "Pending",
                        podName: null,
                        queuing: false
                    }
                }
                return {
                    status: element.status.conditions[1].status,
                    podName: element.metadata.name,
                    queuing: false
                }
            }
        }
        res.send({
            status: "server not running",
            logs: "server not running"
        }).end()
    })

    if (podStatus) {
        let logsData = "server's not running at the moment (starting up)"
        // cheking if logsData should be updated
        if (podStatus.queuing) {
            logsData = podStatus.queuing
        } else if (podStatus.podName !== null) {
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
        'url': `${process.env.K8S_DEFAULT_API}/api/v1/namespaces/mc-servers/services`,
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