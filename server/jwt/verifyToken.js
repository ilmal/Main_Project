const jwt = require("jsonwebtoken")

const loginAuth= (req, res, next)=>{
    res.set({
        "Access-Control-Allow-Origin": "http://localhost:3000"
    })
    const token = req.headers.authorization
    if(!token){
        console.log("access denied")
        return res.status(401)
    }
    try {        
        const verified = jwt.verify(token, process.env.TOKEN_SECRET, (err)=>{
            if(err){
                if(err.name === "TokenExpiredError"){
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
            auth: false
        })
    }
}
module.exports = loginAuth 
