const router = require("express").Router()

const create = require("../../controllers/mconf/create")
const getData = require("../../controllers/mconf/getData")

router.use("/create", create)
router.use("/getData", getData)

module.exports = router