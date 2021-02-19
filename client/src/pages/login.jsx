import axios from "axios"
import { useCookies } from "react-cookie"

const LoginPage = ()=>{

    const [cookies, setCookie] = useCookies(["AuthToken"])

    const sendData = (data)=>{
        console.log("name: ",data.target.name.value, "pass: ",data.target.password.value)
        data.preventDefault()
        axios.defaults.withCredentials = true
        axios.post("http://localhost:3001/api/user/login", {
            name: data.target.name.value,
            password: data.target.password.value
        }).then(response=>{
            if(response.data.data === "success"){
                setCookie("AuthToken", "Nils", {
                    path: "/",
                    maxAge: 3600,
                    sameSite: true,
                  })
            }
        })
    }

    return ( 
        <div className="loginMainBody">
            <div className="loginBody">
                <div className="signUpContainerHeader">
                    <span>LOGIN</span>
                </div>
                <form onSubmit={sendData} method="POST" className="loginCenterInnerContainer">
                    <div className="loginForm">
                        <input type="text" name="name" className="loginInput" autoComplete="off" required/>
                        <label className="loginLable">
                            <span className="loginLableValue">Name</span>
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
 
export default LoginPage;