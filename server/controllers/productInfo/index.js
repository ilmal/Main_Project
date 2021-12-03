const router = require("express").Router()
const User = require("../../models/user/config.model")
const UserProducts = require("../../models/user/config.modelProducts")

router.post("/", async (req, res) => {
    const products = await UserProducts.findOne({ game: req.body.game })
    res.send({
        basic: {
            price: products.basic.get("price") / 100,
            mem: parseInt(products.basic.get("memoryLim").replace("Gi", "")),
            cpu: products.basic.get("cpuLim") / 1000
        },
        normal: {
            price: products.normal.get("price") / 100,
            mem: parseInt(products.normal.get("memoryLim").replace("Gi", "")),
            cpu: products.normal.get("cpuLim") / 1000
        },
        premium: {
            price: products.premium.get("price") / 100,
            mem: products.premium.get("memoryLim").replace("Gi", ""),
            cpu: products.premium.get("cpuLim") / 1000
        }
    })
})

module.exports = router;