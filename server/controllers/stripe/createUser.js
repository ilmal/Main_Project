const createUser = (payment) => {
    console.log(payment.charges.data[0].billing_details.email)
}

module.exports = createUser