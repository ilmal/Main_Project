import React, { useState } from "react"
import axios from "axios"

const ChangeUserPass = () => {
    const [change, setChange] = useState(false)

    const toggle = () => {
        setChange(prev => !prev)
    }

    const sendData = async (e) => {
        e.preventDefault()
        console.log("sending data")
        console.log("oldPasse: ", e.target.oldPassword.value, "newPass: ", e.target.newPassword.value)

        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userID='))
            .split('=')[1];

        await axios.post("http://localhost:3001/api/user/changepass", {
            id: cookieValue,
            oldPassword: e.target.oldPassword.value,
            newPassword: e.target.newPassword.value,
        }).then(response => {
            console.log("response from updateData: ", response.data.data)
        })
        window.location.reload()
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
                        <input type="password" name="oldPassword" />
                    </div>
                    <div>
                        <p>New Password:</p>
                        <input type="password" name="newPassword" />
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