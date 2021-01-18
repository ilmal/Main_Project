const router = require("express").Router()

router.get("/", (req, res)=>{
    console.log("req accepted")
})

module.exports = router