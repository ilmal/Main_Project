import { combineReducers } from "redux"

const initailState = {
    user: "default",
    auth: null
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