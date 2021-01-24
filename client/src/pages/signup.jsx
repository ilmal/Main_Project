const SignupPage = ()=>{

    return ( 
        <div className="loginBody">
                <form action="login" method="POST" className="loginCenterInnerContainer">
                    <div className="signUpContainerHeader">
                        <span>Sign up</span>
                    </div>
                    <div className="loginForm">
                        <input type="text" name="name" className="loginInput" autoComplete="off" required/>
                        <label className="loginLable">
                            <span className="loginLableValue">Name</span>
                        </label>
                    </div>
                    <div className="loginForm">
                        <input  type="email" name="email" className="loginInput" autoComplete="off" required/>
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
        );
}
 
export default SignupPage;