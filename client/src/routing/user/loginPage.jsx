import FloatingAniamtion from "../../components/misc/floatingAnimation"

const loginPage = ()=>{

    return ( 
        <div className="loginBody">
            <FloatingAniamtion>
                <form action="login" method="POST" className="loginCenterInnerContainer">
                    <div className="loginContainerHeader">
                        <span>Login</span>
                    </div>
                    <div className="loginForm" id="fdsfsgsdg">
                        <input type="text" name="name" className="loginInput" autoComplete="off" required/>
                        <label className="loginLable">
                            <span className="loginLableValue">Name</span>
                        </label>
                    </div>
                    <div className="loginForm" id="fasdfdsfd">
                        <input type="password" name="password" className="loginInput" autoComplete="off" required/>
                        <label className="loginLable">
                            <span className="loginLableValue">Password</span>
                        </label>
                    </div>    
                    <button type="submit" className="loginButton">submit</button>
                </form>
            </FloatingAniamtion>
        </div>
        );
}
 
export default loginPage;