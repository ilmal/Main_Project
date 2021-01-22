const router = require("express").Router()

router.get("/", (req, res)=>{
    console.log(req.headers)
    res.set({
        "Access-Control-Allow-Origin": "http://localhost:3000"
    })
    res.send({
        data:"test",
        message:"test2"
    })
})

module.exports = router