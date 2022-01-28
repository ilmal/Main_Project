import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import store from "../../store";

export const Err = () => {
    const state = useSelector(state => state)

    const [errMessage, changeErrMessage] = useState(state.errMessage)

    useEffect(() => {
        if (state.errMessage) {
            changeErrMessage(state.errMessage)
        }
    }, [state])

    const testErr = () => {
        setTimeout(() => {
            changeErrMessage(false)
            store.dispatch({
                type: "CLEAR_ERR_MESSAGES"
            })
        }, 5000)
        return (
            <div className="topErrMessageTest">
                <span>{state.errMessage}</span>
            </div>
        )
    }

    switch (errMessage) {
        case false:
            return null;
        default:
            return testErr();
    }
}