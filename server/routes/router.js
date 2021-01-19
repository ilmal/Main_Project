const router = require("express").Router()

const userRouter = require("./userRoutes/home")

router.use("/user", userRouter)

module.exports = router