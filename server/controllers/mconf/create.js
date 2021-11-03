const express = require("express");
const router = express.Router();
const Config = require("../../models/minecraftConfig/config.model")
const User = require("../../models/user/config.model")
const bodyParser = require("body-parser");

const YAML = require('js-yaml');
const fs = require("fs")

const creatingUserConf = async (element, user) => {


  // //getting yaml files
  // const deploymentRaw = fs.readFileSync(__dirname + "/minecraftDeployment.yaml");
  // const pvcRaw = fs.readFileSync(__dirname + "/minecraftPVC.yaml");
  // const serviceRaw = fs.readFileSync(__dirname + "/minecraftService.yaml");

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

  // //inserting values
  // service.metadata.name = serviceName
  // service.metadata.labels.app = req.body.id
  // service.spec.selector.app = req.body.id
  // service.spec.ports[0].nodePort = realPortNumber

  const mcConf = new Config({
    id: element.server_id,
    portNumber: await findPortNumber(),
    pvc: pvcStr,
    deployment: deploymentStr,
    service: serviceStr
  })

  // const mcConf = new Config({
  //   id: req.body.id,
  //   portNumber: realPortNumber,
  //   pvc: pvcStr,
  //   deployment: deploymentStr,
  //   service: serviceStr
  // })

  res.send("success")
}

router.post("/", async (req, res) => {

  /*
    what needs to be done:

    the server id is saved to the user database. I need to extract the data from the user database at every login and check if the server id
    has a server connected to it. If not, create server, else skip. 

  
  */

  // loading user
  const user = await User.findOne({ _id: req.body.id })
  // cheking if user exist
  if (!user) {
    const errMessage = "no user found with ID: " + req.body.id
    console.log(errMessage)
    return res.send(errMessage)
  }
  user.servers.forEach(element => {
    //checking if server is already created
    const config = Config.findOne({ id: element.server_id })
    if (config) {
      const errMessage = "err with the duplicate mc-conf"
      console.log(errMessage)
      res.send(errMessage)
      return
    }
    creatingUserConf(element, user)
  });

})


module.exports = router;
