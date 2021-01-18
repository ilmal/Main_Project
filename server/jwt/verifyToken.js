const jwt = require("jsonwebtoken")

const loginAuth= (req, res, next)=>{
    const token = req.cookies
    if(!token){
        console.log("access denied")
        return res.status(401)
    }
    try {
        const verified = jwt.verify(token.loginAuth, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        console.log("invalid token")
        res.status(400)
        res.redirect("/")
    }
}
module.exports = loginAuth 
