const router = require("express").Router()

const userRouter = require("./userRoutes/home")
const mcConfRouter = require("./mcConfRoutes/default")

router.use("/user", userRouter)
router.use("/mcConf", mcConfRouter)

module.exports = router