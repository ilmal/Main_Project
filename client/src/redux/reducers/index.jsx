import { combineReducers } from "redux"

import fetchUserData from "./user"
import getUserName from "./getUserName"

const rootReducer = combineReducers({
    fetchUserData,
    getUserName
})

export default rootReducer