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

export const passFormPayment = (history) => {

    const formHandler = (e) => {
        e.preventDefault()
        console.log('%c%s', 'color: green', "password1", e.target.password1.value)
        console.log('%c%s', 'color: green', "password2", e.target.password2.value)
    }

    const redirectToLogin = () => {
        history.push("/user/login");
        window.location.reload();
    }

    // passing specific layout of successPayment to the paymentHandlerDefault func
    const spec = (
        <>
            <div className="paymentHandlerHeader">
                <span>One more step!</span>
            </div>
            <div className="paymentHandlerHeaderDivider" />
            <form className="paymentHandlerCreatePassContainer" onSubmit={formHandler}>
                <span className="paymentHandlerCreatePassHeader">Create account:</span>
                <div className="paymentHandlerPassContainer">
                    <div className="paymentHandlerInput1">
                        <input type="password" name="password1" className="loginInput" autoComplete="off" required />
                        <label className="paymentHandlerLabel">
                            <span className="paymentHandlerLabelValue">Password</span>
                        </label>
                    </div>
                    <div className="paymentHandlerInput2">
                        <input type="password" name="password2" className="loginInput" autoComplete="off" required />
                        <label className="paymentHandlerLabel">
                            <span className="paymentHandlerLabelValue">Retype Password</span>
                        </label>
                    </div>
                </div>
                <button type="submit">Create account</button>
                <span className="paymentHandlerCreatePassToLogin" onClick={redirectToLogin}>Already have an account? Login</span>
            </form>
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