import { store } from "../.."
import { updatePassMail } from "../../redux/actions"


const ForgotPassComponent = () => {

    const sendLinkFunc = (e) => {
        e.preventDefault()
        console.log(e.target.email.value)
        updatePassMail(store.dispatch, e.target.email.value)
    }

    const goBackFunc = () => {
        window.location.reload();
    }

    return (
        <div className="loginMainBody">
            <form onSubmit={sendLinkFunc} className="loginBody">
                <div className="loginForgetTitle">
                    <span>Send recovery link</span>
                </div>
                <div className="loginForgetMainContainer">
                    <span>Insert the mail connected to your account</span>
                    <div className="loginForm loginFormForget">
                        <input type="text" name="email" className="loginInput loginInputForget" autoComplete="off" required />
                        <label className="loginLable loginLableForget">
                            <span className="loginLableValue" data-tip='test'>Email</span>
                        </label>
                    </div>
                </div>
                <button type="submit" className="loginForgetButton">Send link</button>
                <div onClick={goBackFunc} className="loginForgetBack fas fa-arrow-left">
                    <span>Go back</span>
                </div>
            </form>
        </div>
    )

}

export default ForgotPassComponent