const router = require("express").Router()

router.get("/", (req, res)=>{
    console.log(req.headers)
    res.set({
        "Access-Control-Allow-Origin": "*"
    })
    res.send({
        data:"hello",
        message:"I'm really cool!"
    })
})

module.exports = router