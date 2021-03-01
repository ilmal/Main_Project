import { combineReducers } from "redux"

const initailState = {
    user: "default",
    auth: false
}

const reducer = (state = initailState,action)=>{
    
    switch (action.type) {
        case "FETCH_USER_SUCCESS":
            return{
                ...state,
                user: action.payload
            }
        case "AUTH_SUCCESS":
            return{
                ...state,
                auth: action.payload
            }
        default:
            return{
                ...state
            }
    }
}

// const rootReducer = combineReducers({
//     fetchUser,
//     authSuccess
// })

export default reducer