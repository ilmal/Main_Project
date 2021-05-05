import react, { useState } from "react"
import axios from "axios"

export const MessagePage = () => {
    const [feedBack, setFeedBack] = useState("")
    const [errMessage, seterrMessage] = useState("")

    const sendFeed = async (e) => {
        e.preventDefault()
        console.log(feedBack)
        axios.defaults.withCredentials = true
        await axios.post("http://192.168.1.247:3001/api/nodemailer/messages", {
            withCredentials: true,
            type: "feedback",
            content: feedBack
        }).then(response => {
            console.log(response)
            document.getElementById("04835lsdfkj43").value = ""
        })
    }

    const sendErr = (e) => {
        e.preventDefault()
        console.log(errMessage)
    }

    return (
        <div className="messageHomeMainContainer">
            <div className="todoContainer defaultContainer">
                <div className="innerTopContainer">
                    <span>Add to our todo-list</span>
                </div>
                <form className="innerBottomContainer">
                    <textarea id="04835lsdfkj43" placeholder="Put your feature request here!" onChange={(e) => setFeedBack(e.target.value)} />
                    <button type="submit" onClick={sendFeed}>Send</button>
                </form>
            </div>
            <div className="errorContainer defaultContainer">
                <div className="innerTopContainer">
                    <span>Report any problems here</span>
                </div>
                <form className="innerBottomContainer">
                    <textarea placeholder="Share your problems here!" onChange={(e) => seterrMessage(e.target.value)} />
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
