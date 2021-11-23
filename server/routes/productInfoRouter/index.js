const router = require("express").Router()

const productInfo = require("../../controllers/productInfo")

router.use("/", productInfo)

module.exports = router
