const router = require("express").Router()

const userRouter = require("./userRoutes")
const mcConfRouter = require("./mcConfRoutes")
const k8sRouter = require("./k8sApiRoutes")
const serverRouter = require("./serverRouter")
const nodemailer = require("./nodemailer")
const confirmation = require("./confimationRoutes")
const changePass = require("./changePassRoutes")


router.use("/user", userRouter)
router.use("/mcConf", mcConfRouter)
router.use("/server", serverRouter)
router.use("/k8s", k8sRouter)
router.use("/nodemailer", nodemailer)
router.use("/changepass", changePass)
router.use("/confirmation", confirmation)

module.exports = router