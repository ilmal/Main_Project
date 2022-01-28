const router = require("express").Router()

const handler = require("../../controllers/api/k8sApi")

router.use("/", handler)

module.exports = router