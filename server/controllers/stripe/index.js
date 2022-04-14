const router = require("express").Router()
let request = require('request');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const Products = require("../../models/user/config.modelProducts")
const User = require("../../models/user/config.model")
const createUser = require("./createUser")
const refHandler = require("./refHandler")
const mongoose = require("mongoose")

router.post("/", async (req, res) => {
    // getting the products data
    const products = await Products.findOne({ game: "minecraft" })
    // throwing err in case of err with data extraction
    if (!products || products === "null") {
        console.error("something went wrong with getting products (controllers/stripe/index.js)")
        res.send({
            message: "something went wrong with the internal database",
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
    let { id, product, ref, userID, is_past_server } = req.body
    let price = products[product.plan.toLowerCase()].get("price")

    // ref handler (ref is for referal links)
    let refReturn
    console.log("REF PRE FUNCTION: ", ref)
    if (ref) {
        refReturn = await refHandler.initialRefCheck(ref)
        if (refReturn.referal_exist && refReturn.discount != null) {
            price = price * (1 - (refReturn.discount / 100))
        }
    }

    const createServerIDFunc = () => {
        let result = "";
        let characters = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < 19; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                characters.length));
        }
        result += "-" + userID
        return result;
    }

    // creating the payment
    // case of success, create user with details collected with card, send success data to client
    // case of err, return errmessage to client
    try {
        const payment = await stripe.paymentIntents.create({
            amount: price,
            currency: "EUR",
            description: `Referal: ${ref}`,
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment)
        createUser(payment)
        refHandler.paymentSuccessRefHandler(payment, ref)

        // adding payment details to the user database
        // loading user
        const user = await User.findById(userID)
        let userServerObj = {
            server_id: createServerIDFunc(),
            plan: product.plan,
            game: product.game,
            payment_ref: ref,
            payment_id: id,
            date: new Date()
        }

        if (is_past_server) {
            // need to merge this "userServerObj" with mongoosedata base, and with that update the payment date

            for (let i = 0; i < user.servers.length; i++) { // finding the correct server
                if (server_id != is_past_server) continue

                // changing the server values
                const serverObj = {
                    ...user.servers[i],
                    plan: product.plan,
                    game: product.game,
                    payment_ref: ref,
                    payment_id: id,
                    date: new Date()
                }

                user.servers[i] = serverObj
                user.past_servers[i] = serverObj

                // saving the data to db
                user.save()
                return res.send({
                    message: "Payment successful",
                    success: true
                })
            }
        }

        user.servers.push(userServerObj)
        user.past_servers.push(userServerObj)
        user.save()

        res.send({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.send({
            message: "Payment failed",
            success: false
        })
    }
})

router.post("/getRefPrice", async (req, res) => {
    const refHandlerReturn = await refHandler.initialRefCheck(req.body.ref)
    console.log("refHandlerReturn.discount", refHandlerReturn)
    if (refHandlerReturn.referal_exist) {
        return res.send(refHandlerReturn.discount)
    }
    res.send(false)
})

module.exports = router;