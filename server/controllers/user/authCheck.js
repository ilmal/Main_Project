const { verify } = require("jsonwebtoken")

const router = require("express").Router()
const verifyToken = require("../../jwt/verifyToken")

router.get("/", verifyToken, (req, res) => {

    res.set({
        "Access-Control-Allow-Origin": "http://localhost:3000"
    })
    res.send({
        auth: true
    })
})

module.exports = router