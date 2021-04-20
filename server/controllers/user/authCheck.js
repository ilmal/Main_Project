const { verify } = require("jsonwebtoken")

const router = require("express").Router()
const verifyToken = require("../../jwt/verifyToken")

router.get("/", verifyToken, (req, res) => {
    res.send({
        auth: true
    })
})

module.exports = router