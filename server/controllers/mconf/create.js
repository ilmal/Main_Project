const express = require("express");
const router = express.Router();
const Config = require("../../models/minecraftConfig/config.model")
const User = require("../../models/user/config.model")
const bodyParser = require("body-parser");
var ObjectId = require('mongodb').ObjectID;
const YAML = require('js-yaml');
const fs = require("fs")

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

  console.log("server_id: ", element.server_id)

  //inserting values
  pvc.metadata.name = element.server_id
  deployment.metadata.name = element.server_id
  deployment.spec.selector.matchLabels.app = element.server_id
  deployment.spec.template.metadata.labels.app = element.server_id
  deployment.spec.template.spec.volumes[0].persistentVolumeClaim.claimName = element.server_id
  deployment.spec.template.spec.containers[0].env[4].value = `${user.name}Server`
  // const serviceName = element.server_id.replace(/[0-9]/g, 'a')
  service.metadata.name = element.server_id.split("_")[0]
  service.metadata.labels.app = element.server_id
  service.spec.selector.app = element.server_id
  service.spec.ports[0].nodePort = await findPortNumber()

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
      console.log(errMessage)
      return
    }
    console.log("no config")
    await creatingUserConf(element, user)
  });
  res.send("success")
})


module.exports = router;
