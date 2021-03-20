const router = require("express").Router()

const create = require("../../controllers/mconf/create")
const getData = require("../../controllers/mconf/getData")
const updateData = require("../../controllers/mconf/updateData")

router.use("/create", create)
router.use("/getData", getData)
router.use("/updateData", updateData)

module.exports = router