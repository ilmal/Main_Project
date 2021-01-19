const router = require("express").Router()

router.get("/", (req, res)=>{
    res.set({
        "Access-Control-Allow-Origin": "*"
    })
    res.send({data:"hello"})
})

module.exports = router