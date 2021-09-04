const router = require("express").Router()
let request = require('request');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const Products = require("../../models/user/config.modelProducts")
const createUser = require("./createUser")


router.post("/", async (req, res) => {

    // getting the products data
    const products = await Products.findOne({ game: "minecraft" })
    // throwing err in case of err with data extraction
    if (!products || products === "null") {
        console.error("something went wrong with getting products (controllers/stripe/index.js)")
        res.send({
            message: "something went wrong with database",
            success: false
        })
        return
    }
    // confirmation that data is extracted
    if (products) {
        console.log("my collection is working")
        console.log(products.basic.get("price"))
    }

    // putting req data into variables
    let { id, product } = req.body

    // creating the payment
    // case of success, create user with details collected with card, send success data to client
    // case of err, return errmessage to client
    try {
        const payment = await stripe.paymentIntents.create({
            amount: products[product.plan.toLowerCase()].get("price"),
            currency: "EUR",
            description: "U1Servers",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment)
        createUser(payment)
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