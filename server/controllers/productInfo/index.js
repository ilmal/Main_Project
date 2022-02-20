const router = require("express").Router()
const User = require("../../models/user/config.model")
const UserProducts = require("../../models/user/config.modelProducts")

router.post("/", async (req, res) => {
    const products = await UserProducts.findOne({ game: req.body.game })

    const genJSON = (tier) => {
        const priceConv = (price) => price / 100

        const memConv = (mem) => parseInt(mem.replace("Gi", ""))

        const cpuCon = (cpu) => parseInt(cpu.replace("m", "")) / 1000

        return {
            price: priceConv(products[tier].get("price")),
            mem: memConv(products[tier].get("memoryLim")),
            cpu: cpuCon(products[tier].get("cpuLim"))
        }
    }

    res.send({
        basic: genJSON("basic"),
        normal: genJSON("normal"),
        premium: genJSON("premium")
    })
})

module.exports = router;