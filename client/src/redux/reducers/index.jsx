import { combineReducers } from "redux"

const initailState = {
    user: "default",
    auth: null,
    serverPods: "default",
    serverSVC: "default",
    serverTIME: null,
    env: [
        { name: "", value: "" },
        { name: "", value: "" },
        { name: "", value: "" },
        { name: "", value: "" },
        { name: "", value: "" },
        { name: "", value: "" },
        { name: "", value: "" },
        { name: "", value: "" }
    ],
    errMessage: false,
    message: false
}

const Reducer = (state = initailState, action) => {
    switch (action.type) {
        case "FETCH_USER_SUCCESS":
            return {
                ...state,
                user: action.payload
            }
        case "AUTH_SUCCESS":
            return {
                ...state,
                auth: action.payload
            }
        case "LOGIN":
            document.cookie = `loginAuth=${action.payload.loginAuth};path=/`
            document.cookie = `userID=${action.payload.userID};path=/`
        case "SERVER_PODS_DATA":
            return {
                ...state,
                serverPods: action.payload
            }
        case "SERVER_SVC_DATA":
            return {
                ...state,
                serverSVC: action.payload
            }
        case "SERVER_TIME_DATA":
            return {
                ...state,
                serverTIME: action.payload
            }
        case "MC_CONF_GET_DATA":
            return {
                ...state,
                env: action.payload.env
            }
        case "ERR_MESSAGE":
            return {
                ...state,
                errMessage: action.payload
            }
        case "CLEAR_ERR_MESSAGES":
            return {
                ...state,
                errMessage: false
            }
        case "MESSAGE":
            return {
                ...state,
                message: action.payload
            }
        case "CLEAR_MESSAGES":
            return {
                ...state,
                message: false
            }
        case "DUMP":
            return {
                ...state,
            }
        default:
            return {
                ...state
            }
    }
}

export default Reducer