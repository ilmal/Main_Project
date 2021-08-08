const router = require("express").Router()
let request = require('request');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const Products = require("../../models/user/config.modelProducts")

router.post("/", async (req, res) => {

    const products = await Products.findOne({ game: "minecraft" })
    if (!products || products === "null") {
        console.error("something went wrong with getting products (controllers/stripe/index.js)")
        res.send({
            message: "something went wrong with database",
            success: false
        })
        return
    }
    if (products) {
        console.log("my collection is working")
        console.log(products.basic.get("price"))
    }

    let { id } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount: products.basic.get("price"),
            currency: "EUR",
            description: "U1Servers",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment)
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
})

module.exports = router;