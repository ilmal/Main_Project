const router = require("express").Router()

router.post("/", (req, res) => {


    console.log("")
    console.log("")
    console.log("hello!")
    console.log("")
    console.log("")

    res.send("hello!!!")
})

module.exports = router