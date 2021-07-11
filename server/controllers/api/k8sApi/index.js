const router = require("express").Router();
const request = require('request-promise');
const moment = require("moment")
moment().format()

const logs = async (name) => {
    const config = {
        'method': 'GET',
        'url': `${process.env.K8S_DEFAULT_API}/api/v1/namespaces/mc-servers/pods/${name}/log`,
    }

    return request(config).then(response => {
        // break the textblock into an array of lines
        var lines = response.split('\n');

        //filtering logs and removing logs that should get removed
        filterdLines = lines.filter(data => {
            if (data.indexOf("Can't keep up!") > -1 ||                                                                  //preformance
                data.indexOf("Mismatch in destroy block pos:") > -1 ||                                                  //preformance
                data.indexOf("[init] Setting initial memory to") > -1 ||                                                //spec details
                data.indexOf("[Autopause loop]") > -1 ||                                                                //autopause
                data.indexOf("[Autopause]") > -1 ||                                                                     //autopause
                data.indexOf("[RCON Client /127.0.0.1 #2/INFO]: Thread RCON Client /127.0.0.1 shutting down") > -1 ||   //autopause
                data.indexOf("[RCON Listener #1/INFO]: Thread RCON Client /127.0.0.1 started") > -1 ||                  //autopause
                data.indexOf("[Server thread/INFO]: [Rcon: Saved the game]") > -1) {                                    //autopause

                return false
            } else {
                return true
            }
        })


        // join the array back into a single string
        var newtext = filterdLines.join('\n');
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
            res.send({
                status: "server not running",
                logs: "server not running"
            }).end()
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
            logs: logsData,
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
                    console.log(element.spec.ports[0].nodePort)
                    res.send({
                        port: element.spec.ports[0].nodePort
                    })
                    res.end()
                    throw "server SVC found, exit function"
                }
            }
            res.send({
                status: "server not running"
            })
            res.end()
            throw "Server SVC is not running!"
        } catch (error) {
            //console.log(error)
        }
    })
})

router.post("/time", async (req, res) => {
    const config = {
        'method': 'GET',
        'url': `${process.env.K8S_DEFAULT_API}/api/v1/namespaces/mc-servers/pods`,
    }

    await request(config).then(response => {
        const data = JSON.parse(response)

        // getting the pods
        for (let i = 0; i < data.items.length; i++) {
            const element = data.items[i];
            //getting a specific pod
            if (element.metadata.name.includes(req.body.id)) {
                // setting timestamp to a default if it's not reset, or have been reset before
                let timeStamp = element.metadata.creationTimestamp

                // req.body.reset = if the server should reset the time
                // req.body.timeOfReset = the time the server was last reset, this is needed to calculate remaining time after a reset

                //console.log("req.body.reset: ", req.body.reset, "req.body.timeOfReset: ", req.body.timeOfReset)

                if (req.body.timeOfReset) {
                    timeStamp = req.body.timeOfReset // send this to client 
                }
                if (req.body.reset) {
                    timeStamp = moment().toDate()
                }
                // creating a new timestamp with the added 30 min
                const newTimeStamp = moment(timeStamp).add(2, 'm').toDate()
                const currentTime = moment().toDate()
                // calculating time remaining
                const timeLeftExact = (newTimeStamp - currentTime) / 60000 //NewTimeStamp - currentTimeStamp in milliseconds converted to mins
                const timeLeft = timeLeftExact.toString().split(".")[0]

                //console.log("Time left: ", timeLeft)

                // check if the current time is more recent than the newTimeStamp, if case: the time has expired
                if (currentTime > newTimeStamp) {
                    console.log("THE TIME HAS EXPIRED!!!!!!")
                    res.send({
                        timeOfReset: null,
                        timeLeft: 0,
                        serverShutDown: true
                    })
                } else {
                    res.send({
                        timeOfReset: timeStamp,
                        timeLeft: timeLeft,
                        serverShutDown: false
                    })
                }
                return
            }
            console.log("server not found (/k8s/time)")
            res.send({
                "err": "server not running"
            })
        }
        console.log("no servers runninng (/k8s/time)")
        res.send({
            "err": "no servers running"
        })
    })
})

module.exports = router;