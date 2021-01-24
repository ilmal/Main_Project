const SignupPage = ()=>{

    return ( 
        <div className="loginMainBody">
            <div className="loginBody">
                <div className="signUpContainerHeader">
                    <span>SIGN UP</span>
                </div>
                <form action="login" method="POST" className="loginCenterInnerContainer">

                    <div className="loginForm">
                        <input type="text" name="name" className="loginInput" autoComplete="off" required/>
                        <label className="loginLable">
                            <span className="loginLableValue">Name</span>
                        </label>
                    </div>
                    <div className="loginForm">
                        <input  type="text" name="email" className="loginInput" autoComplete="off" required/>
                        <label className="loginLable">
                            <span className="loginLableValue">Email</span>
                        </label>
                    </div>
                    <div className="loginForm">
                        <input type="password" name="password" className="loginInput" autoComplete="off" required/>
                        <label className="loginLable">
                            <span className="loginLableValue">Password</span>
                        </label>
                    </div>    
                    <button type="submit" className="loginButton">submit</button>
                </form>
            </div>
        </div>
        );
}
 
export default SignupPage;