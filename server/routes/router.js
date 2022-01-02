const router = require("express").Router()

const userRouter = require("./userRoutes")
const mcConfRouter = require("./mcConfRoutes")
const k8sRouter = require("./k8sApiRoutes")
const serverRouter = require("./serverRouter")
const nodemailer = require("./nodemailer")
const confirmationValidation = require("./confimationValidationRoutes")
const updatePassValidation = require("./updatePassValidationRoutes")
const stripeRouter = require("./stripeRoutes")
const productInfoRouter = require("./productInfoRouter")

router.use("/user", userRouter)
router.use("/mcConf", mcConfRouter)
router.use("/server", serverRouter)
router.use("/k8s", k8sRouter)
router.use("/nodemailer", nodemailer)
router.use("/confirmationvalidation", confirmationValidation)
router.use("/updatepassValidation", updatePassValidation)
router.use("/stripe", stripeRouter)
router.use("/productInfo", productInfoRouter)

module.exports = router