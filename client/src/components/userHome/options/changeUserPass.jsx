import React, { useState, useEffect } from "react"
import axios from "axios"
import { store } from "../../../index"

const ChangeUserPass = () => {
    const [change, setChange] = useState(false)

    const toggle = () => {
        setChange(prev => !prev)
    }

    useEffect(() => {
        if (change) {
            document.getElementById("9dso8hybf").className = "userHomeSegment userHomeChangeDefaults userHomeLogoutContainerDefaults userHomeLogoutContainerMoved"
            console.log(change)
        } else {
            document.getElementById("9dso8hybf").className = "userHomeSegment userHomeChangeDefaults userHomeLogoutContainerDefaults userHomeLogoutContainer"
            console.log(change)
        }
    }, [change])

    const sendData = async (e) => {
        e.preventDefault()
        console.log("sending data")
        console.log("oldPass: ", e.target.oldPassword.value, "newPass1: ", e.target.newPassword1.value, "newPass2: ", e.target.newPassword2.value)

        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userID='))
            .split('=')[1];

        if (e.target.oldPassword.value === "" || e.target.newPassword1.value === "" || e.target.newPassword2.value === "") {
            console.log("Fill in all values!")
            store.dispatch({
                type: "ERR_MESSAGE",
                payload: "Fill in all values!"
            })
            return
        }

        if (e.target.newPassword1.value != e.target.newPassword2.value) {
            console.log("new passwords doesn't match!")
            store.dispatch({
                type: "ERR_MESSAGE",
                payload: "The verified password must match the new password!"
            })
            return
        }


        await axios.post("/user/changepass", {
            id: cookieValue,
            oldPassword: e.target.oldPassword.value,
            newPassword: e.target.newPassword1.value
        }).then(response => {

            if (response.data.type === "success") {
                store.dispatch({
                    type: "MESSAGE",
                    payload: response.data.payload
                })
                setChange(prev => !prev)
            } else if (response.data.type === "err") {
                store.dispatch({
                    type: "ERR_MESSAGE",
                    payload: response.data.payload
                })
            }
        })
    }

    const passDefault = () => {
        return (
            <div className="userHomeSegment changePasswordDefault userHomeChangeDefaults">
                <button onClick={toggle}>Change Password</button>
            </div>
        )

    }

    const passChange = () => {
        return (
            <div className="userHomeSegment changePasswordChange userHomeChangeDefaults">
                <form className="inner" onSubmit={sendData}>
                    <div>
                        <p>Old Password:</p>
                        <input type="password" name="oldPassword" autoComplete="off" required />
                    </div>
                    <div>
                        <p>New Password:</p>
                        <input type="password" name="newPassword1" autoComplete="off" required />
                    </div>
                    <div>
                        <p>Verify Password:</p>
                        <input type="password" name="newPassword2" autoComplete="off" required />
                    </div>
                    <button type="submit">save</button>
                </form>
            </div>
        )

    }

    switch (change) {
        case true:
            return passChange()
        default:
            return passDefault()
    }
}

export default ChangeUserPass