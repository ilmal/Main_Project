const minecraftPVC = `
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: custom_pvc_name
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 7Gi
  storageClassName: rook-minecraft

`

const minecraftDeployment = `

apiVersion: apps/v1
kind: Deployment
metadata:
  name: custom_deployment_name
spec:
  replicas: 1
  selector:
    matchLabels:
      app: custom_deployment_name
  template:
    metadata:
      labels:
        app: custom_deployment_name
    spec:
      volumes:
        - name: minecraft-pv-storage
          persistentVolumeClaim:
             claimName: custom_claim_name
      containers:
      - image: itzg/minecraft-server
        name: minecraft-server
        env:
        - name: TYPE
          value: "VANILLA"

        - name: EULA
          value: "TRUE"

        - name: MAX_PLAYERS
          value: "5"

        - name: VERSION
          value: "custom_version"

        - name: SERVER_NAME
          value: "custom_serverName"

        - name: DIFFICULTY 
          value: "custom_difficulty"

        - name:  WHITELIST
          value: "custom_whitelist"

        - name: OPS
          value: "custom_ops"

        ports:
        - containerPort: 25565
          name: minecraft
          protocol: TCP
        volumeMounts:
          - mountPath: "/data"
            name: minecraft-pv-storage

`

const minecraftService = `

apiVersion: v1
kind: Service
metadata:
  name: custom_service_name
  labels:
    app: custom_deployment_name
spec:
  selector:
    app: custom_deployment_name
  type: NodePort
  ports:
  - nodePort: 
    port: 25565
    targetPort: 25565
    protocol: TCP
    
`

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const YAML = require('js-yaml');

router.post("/", (req, res) => {
  console.log("mcCreate")
})


module.exports = router;
