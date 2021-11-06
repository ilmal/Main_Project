const jwt = require("jsonwebtoken")

const loginAuth = (req, res, next) => {
    const token = req.headers.authorization
    if (token === "null") {
        console.log("no token")
        res.send("no token")
    } else {
        if (!token) {
            console.log("access denied")
            return res.send({
                auth: false
            })
        }
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        console.log("ExpiredToken since: ", err.expiredAt)
                        throw err
                    }
                    console.log("Error: ", err)
                    throw err
                }
            })
            req.user = verified
            next()
        } catch (err) {
            console.log("invalid token")
            res.send({
                auth: false,
                resetLogin: true
            })
        }
    }
}
module.exports = loginAuth
