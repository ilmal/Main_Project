const router = require("express").Router();

router.post("/", async (req, res) => {
    console.log("welcome to the api hanlder", req.body.id)
})


module.exports = router;