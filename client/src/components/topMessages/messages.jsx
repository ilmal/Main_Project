import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import store from "../../store"

export const Messages = () => {
    const state = useSelector(state => state)

    const [message, changemessage] = useState(state.message)

    useEffect(() => {
        if (state.message) {
            changemessage(state.message)
        }
    }, [state])

    const testErr = () => {
        setTimeout(() => {
            changemessage(false)
            store.dispatch({
                type: "CLEAR_MESSAGES"
            })
        }, 5000)
        return (
            <div className="topMessageTest" style={message === "Server shutting down!" ? { backgroundColor: "rgba(248, 131, 121, .7)" } : null}>
                <span>{state.message}</span>
            </div >
        )
    }

    switch (message) {
        case false:
            return null;
        default:
            return testErr();
    }
}