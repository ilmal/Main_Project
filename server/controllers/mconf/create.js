const express = require("express");
const router = express.Router();
const Config = require("../../models/minecraftConfig/config.model")
const User = require("../../models/user/config.model")
const UserProducts = require("../../models/user/config.modelProducts")
var ObjectId = require('mongodb').ObjectID;
const YAML = require('js-yaml');
const fs = require("fs")

const errPath = "controllers.mcConf.create.js"

const creatingUserConf = async (elementMap, user) => {
  // converting element map to obj
  let element = Array.from(elementMap).reduce((element, [key, value]) => (
    Object.assign(element, { [key]: value })
  ), {});


  // //getting yaml files
  const deploymentRaw = fs.readFileSync(__dirname + "/minecraftDeployment.yaml");
  const pvcRaw = fs.readFileSync(__dirname + "/minecraftPVC.yaml");
  const serviceRaw = fs.readFileSync(__dirname + "/minecraftService.yaml");

  //loading yaml
  const deployment = YAML.load(deploymentRaw);
  const pvc = YAML.load(pvcRaw);
  const service = YAML.load(serviceRaw);

  // getting port number
  const findPortNumber = async () => {
    for (let i = 30001; i < 31000; i++) {
      const findUser = await Config.findOne({ portNumber: i }).catch(err => {
        console.log("Error getting portnumber at mcConf.create.findPortNumber():", err)
      })
      if (!findUser) {
        return i
      }
    }
  }

  const dnsName = async () => {
    const config = await Config.find({})

    const loopThroughNames = (name) => {
      uniqueName = true
      config.forEach(element => {
        if (element["service"].indexOf(`mc-router.itzg.me/externalServerName": "${name}.mc.servers.u1.se`) > -1) uniqueName = false
      })
      return uniqueName
    }

    let loopActive = true
    let index = 2
    let name = user.name
    while (loopActive) {
      if (loopThroughNames(name)) {
        loopActive = false
        return name
      }
      name = `${name}${index}`
      index += 1
    }

  }

  //inserting values
  pvc.metadata.name = element.server_id
  deployment.metadata.name = "mc-server-" + element.server_id
  deployment.spec.selector.matchLabels.app = element.server_id
  deployment.spec.template.metadata.labels.app = element.server_id
  deployment.spec.template.spec.volumes[0].persistentVolumeClaim.claimName = element.server_id
  deployment.spec.template.spec.containers[0].env[4].value = `${user.name}Server`
  // const serviceName = element.server_id.replace(/[0-9]/g, 'a')
  service.metadata.name = "mc-server-" + element.server_id.split("-")[0]
  service.spec.selector.app = element.server_id
  service.metadata.annotations = `"mc-router.itzg.me/externalServerName": "${await dnsName()}.mc.servers.u1.se"`
  //service.spec.ports[0].nodePort = await findPortNumber()

  //inserting values dependant on the type/ teir of server

  const serverTier = await UserProducts.findOne({ game: "minecraft" })
  if (!serverTier) console.log("ERR FINDING SERVER TEIR AT: ", errPath)

  const userPlanLowerCase = element.plan.toLowerCase()

  console.log("userPlanLowerCase: ", serverTier.get(userPlanLowerCase).get("memoryReq"))

  if (userPlanLowerCase === "premuim") {
    return console.log("ERR WITH SELECTED SERVER = PREMIUM => NOT SUPPORTED: ", errPath)
  }

  const memoryReq = serverTier.get(userPlanLowerCase).get("memoryReq")
  const cpuReq = serverTier.get(userPlanLowerCase).get("cpuReq")
  const memoryLim = serverTier.get(userPlanLowerCase).get("memoryLim")
  const cpuLim = serverTier.get(userPlanLowerCase).get("cpuLim")


  // switch (user.plan) {
  //   case "BASIC":
  //     memoryReq = "1Gi"
  //     cpuReq = "500"
  //     memoryLim = "1Gi"
  //     cpuLim = "1000"
  //     break;
  //   case "NORMAL":
  //     memoryReq = "2Gi"
  //     cpuReq = "1000"
  //     memoryLim = "2Gi"
  //     cpuLim = "2000"
  //     break;
  //   case "PREMIUM":
  //     console.log("ERR WITH SELECTED SERVER = PREMIUM => NOT SUPPORTED: ", errPath)
  //     break;
  //   default:
  //     console.log("ERR WITH INSERTING VALUES FOR SERVER TEIR AT: ", errPath)
  //     break;
  // }

  // creating value for game memory req, need to be lower than pod req, in order to not OOMKill the process due to lack of memory
  gameMem = (parseInt(memoryReq.split("Mi")[0]) - 10).toString() + "m"


  deployment.spec.template.spec.containers[0].resources.requests.memory = memoryReq // docker limit
  deployment.spec.template.spec.containers[0].resources.requests.cpu = cpuReq       // docker limit
  deployment.spec.template.spec.containers[0].resources.limits.memory = memoryLim   // docker limit
  deployment.spec.template.spec.containers[0].resources.limits.cpu = cpuLim         // docker limit
  deployment.spec.template.spec.containers[0].env[11].value = gameMem             // minecraft limit

  //dumping yaml
  const deploymentStr = YAML.dump(deployment);
  const pvcStr = YAML.dump(pvc);
  const serviceStr = YAML.dump(service);

  const mcConf = new Config({
    id: element.server_id,
    portNumber: await findPortNumber(),
    pvc: pvcStr,
    deployment: deploymentStr,
    service: serviceStr
  })

  await mcConf.save((err, doc) => {
    if (!err) {
      console.log("saving...")
      console.log("saved!")
    } else {
      console.log("Error occured during record insertion: ", err);
    }
  });

}

router.post("/", async (req, res) => {

  /*
    what needs to be done:

    the server id is saved to the user database. I need to extract the data from the user database at every login and check if the server id
    has a server connected to it. If not, create server, else skip. 

  
  */

  // sending succes seems to work, tho, sending the err messages below doesn't work, troubleshoot!

  // res.send("success")

  // loading user
  if (!req.body.id) return res.send("user id is null (at server mcConf.create())")
  const user = await User.findOne({ _id: ObjectId(req.body.id) })
  // cheking if user exist
  if (!user) {
    const errMessage = "no user found with ID: " + req.body.id
    console.log(errMessage)
    return res.send(errMessage)
  }
  // checking if user has servers
  if (user.servers.length === 0) {
    const errMessage = "user doesnt have any servers"
    console.log(errMessage)
    return res.send(errMessage)
  }
  user.servers.forEach(async (element) => {
    //checking if server is already created
    const config = await Config.findOne({ id: element.get("server_id") })
    if (config) {
      const errMessage = "mc-conf already exists"
      // console.log(errMessage)
      return
    }
    console.log("no config")
    await creatingUserConf(element, user)
  });
  res.send("success")
})


module.exports = router;
