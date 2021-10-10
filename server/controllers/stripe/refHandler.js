const Referals = require("../../models/user/config.modelReferals")

const initialRefCheck = async (ref) => {
    // check if ref is registered
    const referals = await Referals.findOne({ ref_id: ref })
    if (referals) {
        return ({
            referal_exist: true,
            discount: referals.discount
        })
    }
    return ({
        referal_exist: false,
        discount: null
    })
}

module.exports.initialRefCheck = initialRefCheck

const paymentSuccessRefHandler = async (payment, ref) => {
    const referals = await Referals.findOne({ ref_id: ref })
    if (!referals) {
        return console.Error("something went wrong with saving the referal, important error. (CUSTOM)")
    }
    referals.past_orders.push(payment)
    referals.save()
}

module.exports.paymentSuccessRefHandler = paymentSuccessRefHandler