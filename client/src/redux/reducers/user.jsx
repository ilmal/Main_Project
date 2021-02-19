import axios from "axios"

const initailState = {
    user: []
}

const reducer = (state = initailState,action)=>{
    
    switch (action.type) {
        case "FETCH_USER_SUCCESS":
            return{
                ...state,
                user: action.payload
            }
        default:
            return{
                ...state,
                user: "testDefault"
            }
    }
}

export const fetchUserData = async(dispatch, getState)=>{
    const response = await axios.get("http://192.168.1.247:3001/api/user", {
        headers: {
            //"customHeader": "test"
        }
    })
    .then(res=>{
        const user = res.data
        dispatch({
            type: "FETCH_USER_SUCCESS",
            payload: res.data
        })
    })
}

export default reducer