import { combineReducers } from "redux"

import getEmail from "./getEmail"
import getUserName from "./getUserName"

const rootReducer = combineReducers({
    getEmail,
    getUserName
})

export default rootReducer