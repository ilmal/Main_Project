import { combineReducers } from "redux"

const initailState = {
    user: "default",
    auth: null,
    serverPods: "default",
    serverSVC: "default",
    env: {
        env: [
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" }
        ]
    }
}

const reducer = (state = initailState, action) => {

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
        case "MC_CONF_GET_DATA":
            return {
                ...state,
                env: action.payload
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

export default reducer