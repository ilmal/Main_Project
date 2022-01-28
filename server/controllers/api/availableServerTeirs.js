const router = require("express").Router()
const User = require("../../models/user/config.modelProducts")
const request = require('request-promise');


router.post("/", async (req, res) => {
    const products = await User.find({})

    resultObj = {}
    for (const product of products) {
        for (const teir of Object.keys(product["_doc"])) {
            if (teir === "_id" || teir === "game") {
                continue
            }
            // console.log("TEIR: ", teir)
            // console.log("VALUE: ", product["_doc"][teir.toLowerCase()].get("cpuLim"))

            const config = {
                'method': 'GET',
                'url': `${process.env.K8S_CUSTOM_API}/getCapacity`,
                'body': JSON.stringify({
                    "reqData": {
                        "cpu": parseInt(product["_doc"][teir.toLowerCase()].get("cpuReq")),
                        "mem": parseInt(product["_doc"][teir.toLowerCase()].get("memoryReq").split("Gi")[0])
                    }
                })
            }
            await request(config).then(response => {
                console.log("RESPONSE: ", response)
                resultObj[teir] = JSON.parse(response)
            })
        }
    }

    console.log("result: ", resultObj)
    res.send(resultObj)

})

module.exports = router