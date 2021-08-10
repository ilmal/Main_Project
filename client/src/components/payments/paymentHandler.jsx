const paymentHanderDefaults = (spec) => {
    // base html for payment handler, and integrate specific layout from payments
    return (
        <div className="paymentHandlerMainContainer">
            <div className="paymentHandlerInnerContainer">
                {spec}
            </div>
        </div>
    )
}

export const successPayment = () => {

    const formHandler = (e) => {
        e.preventDefault()

    }

    // passing specific layout of successPayment to the paymentHandlerDefault func
    const spec = (
        <>
            <div className="paymentHandlerHeader">
                <span>Payment Successful!</span>
            </div>
            <div className="paymentHandlerCreatePassContainer">
                <span>Create account:</span>
                <form onClick={formHandler}>
                    <div className="paymentHandlerInput1">
                        <input type="password" name="password" className="loginInput" autoComplete="off" required />
                        <label className="paymentHandlerLabel">
                            <span className="paymentHandlerLabelValue">Password</span>
                        </label>
                    </div>
                </form>
            </div>
        </>
    )
    return paymentHanderDefaults(spec)
}

export const failPayment = () => {
    // passing specific layout of failPayment to the paymentHandlerDefault func
    const spec = (
        <span>hello!</span>
    )
    return paymentHanderDefaults(spec)
}