const express = require("express");
const router = express.Router();
const Config = require("../../models/minecraftConfig/config.model")
const User = require("../../models/user/config.model")
const bodyParser = require("body-parser");

const YAML = require('js-yaml');
const fs = require("fs")

router.post("/", async (req, res) => {

  res.send("success")

  // // loading user and cheking if user exist



  // // Checking if config is duplicate
  // const duplicateConf = await Config.findOne({ id: req.body.id })
  // console.log("sentID: ", req.body.id)
  // if (duplicateConf) {
  //   console.error("err with the duplicate mc-conf")
  //   res.send("err")
  // }




  // //getting yaml files
  // const deploymentRaw = fs.readFileSync(__dirname + "/minecraftDeployment.yaml");
  // const pvcRaw = fs.readFileSync(__dirname + "/minecraftPVC.yaml");
  // const serviceRaw = fs.readFileSync(__dirname + "/minecraftService.yaml");

  // //loading yaml
  // const deployment = YAML.load(deploymentRaw);
  // const pvc = YAML.load(pvcRaw);
  // const service = YAML.load(serviceRaw);

  // /*-------------------
  // Getting a port number
  // -------------------*/

  // const findPortNumber = async () => {
  //   for (let i = 30001; i < 31000; i++) {
  //     const findUser = await Config.findOne({ portNumber: i }).catch(err => {
  //       console.log("ERROR1234: ", err)
  //     })
  //     if (!findUser) {
  //       return i
  //     }
  //   }
  // }

  // const realPortNumber = await Promise.resolve(findPortNumber())

  // /*------------------
  // changing yaml values
  // ------------------*/

  // //--- creating pvc yaml ---

  // //creating id for servers


  // //inserting values
  // pvc.metadata.name = req.body.id

  // //--- creating deployment yaml ---

  // // getting user name
  // const user = await User.findOne({ _id: req.body.id })
  // if (!user) {
  //   throw "no user found"
  // }
  // const userName = user.name

  // //inserting values

  // deployment.metadata.name = req.body.id
  // deployment.spec.selector.matchLabels.app = req.body.id
  // deployment.spec.template.metadata.labels.app = req.body.id
  // deployment.spec.template.spec.volumes[0].persistentVolumeClaim.claimName = req.body.id

  // deployment.spec.template.spec.containers[0].env[4].value = `${userName}Server`

  // //--- creating service yaml ---
  // //creating a acceptable service name
  // const serviceName = req.body.id.replace(/[0-9]/g, 'a')

  // //inserting values
  // service.metadata.name = serviceName
  // service.metadata.labels.app = req.body.id
  // service.spec.selector.app = req.body.id
  // service.spec.ports[0].nodePort = realPortNumber

  // //dumping yaml
  // const deploymentStr = YAML.dump(deployment);
  // const pvcStr = YAML.dump(pvc);
  // const serviceStr = YAML.dump(service);

  // const mcConf = new Config({
  //   id: req.body.id,
  //   portNumber: realPortNumber,
  //   pvc: pvcStr,
  //   deployment: deploymentStr,
  //   service: serviceStr
  // })

  // await mcConf.save((err, doc) => {
  //   if (!err) {
  //     console.log("saving...")
  //     console.log("saved!")
  //   } else {
  //     console.log("Error occured during record insertion: ", err);
  //   }
  // });

  // res.send("success")
})


module.exports = router;
