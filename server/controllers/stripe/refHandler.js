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