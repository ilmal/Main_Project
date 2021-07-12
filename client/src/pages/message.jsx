import react, { useState } from "react"
import axios from "axios"
import { store } from "../index"

export const MessagePage = () => {
    const [feedBack, setFeedBack] = useState("")
    const [errMessage, seterrMessage] = useState("")

    const sendFeed = async (e) => {
        e.preventDefault()
        console.log(feedBack)

        let cookieValue = null
        if (document.cookie) {
            cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith('userID='))
                .split('=')[1];

            await axios.post(`${process.env.REACT_APP_BACKENDPROXY}/nodemailer/messages`, {
                withCredentials: true,
                type: "feedback",
                content: feedBack,
                userID: cookieValue
            }).then(response => {
                console.log(response)
                document.getElementById("04835lsdfkj43").value = ""
                store.dispatch({
                    type: "MESSAGE",
                    payload: response.data
                })
            })
        } else {
            store.dispatch({
                type: "ERR_MESSAGE",
                payload: "Login before you can send feedback!"
            })
        }
    }

    const sendErr = async (e) => {
        e.preventDefault()
        console.log(feedBack)

        let cookieValue = null
        if (document.cookie) {
            cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith('userID='))
                .split('=')[1];

            await axios.post(`${process.env.REACT_APP_BACKENDPROXY}/nodemailer/messages`, {
                withCredentials: true,
                type: "problem",
                content: feedBack,
                userID: cookieValue
            }).then(response => {
                console.log(response)
                document.getElementById("934765yiusdf").value = ""
                store.dispatch({
                    type: "MESSAGE",
                    payload: response.data
                })
            })
        } else {
            store.dispatch({
                type: "ERR_MESSAGE",
                payload: "Login before you can send feedback!"
            })
        }
    }

    return (
        <div className="messageHomeMainContainer">
            <div className="todoContainer defaultContainer">
                <div className="innerTopContainer">
                    <span>Add to our todo-list</span>
                </div>
                <form className="innerBottomContainer">
                    <textarea id="04835lsdfkj43" placeholder="Put any feature requests here!" onChange={(e) => setFeedBack(e.target.value)} />
                    <button type="submit" onClick={sendFeed}>Send</button>
                </form>
            </div>
            <div className="errorContainer defaultContainer">
                <div className="innerTopContainer">
                    <span>Report any problems here</span>
                </div>
                <form className="innerBottomContainer">
                    <textarea id="934765yiusdf" placeholder="Share any problems here!" onChange={(e) => seterrMessage(e.target.value)} />
                    <button type="submit" onClick={sendErr}>Send</button>
                </form>
            </div>
        </div>
    )
}



export const MessageError = () => {
    return (
        <div className="messageErrorMainContainer">
            <span>HELLO THIS IS MESSAGE ERROR PAGE!</span>
        </div>
    )
}

export const MessageTodo = () => {
    return (
        <div className="messageTodoMainContainer">
            <span>HELLO THIS IS MESSAGE TODO PAGE!</span>
        </div>
    )
}
