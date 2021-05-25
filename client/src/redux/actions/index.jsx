import axios from "axios"
import { store } from "../../"

let cookieValueUserID = null
if (document.cookie && document.cookie.search("userID") > -1) {
    cookieValueUserID = document.cookie
        .split('; ')
        .find(row => row.startsWith('userID='))
        .split('=')[1];
}

let cookieValueAuth = null
if (document.cookie && document.cookie.search("loginAuth") > -1) {
    cookieValueAuth = document.cookie
        .split('; ')
        .find(row => row.startsWith('loginAuth='))
        .split('=')[1];
}

export const fetchUserData = async (dispatch) => {
    await axios.post(`/user`, {
        id: cookieValueUserID,
    })
        .then(res => {
            dispatch({
                type: "FETCH_USER_SUCCESS",
                payload: res.data
            })
        })
}

export const login = (name, pass, dispatch) => {
    axios.post("/user/login", {
        withCredentials: true,
        name: name,
        password: pass
    }).then(async (response) => {
        if (response.data.message === "Success!") {
            await checkUserAuth(dispatch)
            createMcConfig(dispatch)
            dispatch({
                type: "LOGIN",
                payload: {
                    loginAuth: response.data.loginAuth,
                    userID: response.data.userID
                }
            })
            window.location.reload();
        } else {
            console.log("response.data: ", response.data)
            dispatch({
                type: "ERR_MESSAGE",
                payload: response.data
            })
        }
    })
}

export const signup = async (name, email, password, dispatch) => {
    axios.post("/user/insert", {
        data: {
            name,
            email,
            password
        }
    })
        .then(async (response) => {
            if (response.data === "User created") {
                login(name, password, dispatch)
                dispatch({
                    type: "MESSAGE",
                    payload: response.data
                })
            } else {
                dispatch({
                    type: "ERR_MESSAGE",
                    payload: response.data
                })
            }
        })
}

export const checkUserAuth = async (dispatch) => {
    await axios.get(`/user/auth`, {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": cookieValueAuth,
            "Id": cookieValueUserID
        }
    })
        .then(response => {
            dispatch({
                type: "AUTH_SUCCESS",
                payload: response.data.auth
            })
        })
}

export const authSucess = (dispatch) => {
    dispatch({
        type: "AUTH_SUCCESS"
    })
}

export const createMcConfig = async (dispatch) => {
    await axios.post(`/mcConf/create`, {
        id: cookieValueUserID
    })
        .then(res => {
            dispatch({
                type: "DUMP"
            })
        })
}

export const startServer = async (dispatch) => {
    await axios.post(`/server`, {
        id: cookieValueUserID,
        action: "start"
    })
        .then(res => {
            dispatch({
                type: "DUMP"
            })
        })
}

export const stopServer = async (dispatch) => {
    await axios.post(`/server`, {
        id: cookieValueUserID,
        action: "stop"
    })
        .then(res => {
            dispatch({
                type: "DUMP"
            })
        })
}

export const serverPodsInfo = async () => {
    await axios.post(`/k8s/pods`, {
        id: cookieValueUserID
    })
        .then(res => {
            console.log(res)
            store.dispatch({
                type: "SERVER_PODS_DATA",
                payload: res.data
            })
        })
}

export const serverSVCInfo = async (dispatch) => {
    await axios.post(`/k8s/svc`, {
        id: cookieValueUserID
    })
        .then(res => {
            dispatch({
                type: "SERVER_SVC_DATA",
                payload: res.data
            })
        })
}

export const mcConfGetData = async (dispatch) => {
    await axios.post(`/mcConf/getData`, {
        id: cookieValueUserID
    })
        .then(res => {
            dispatch({
                type: "MC_CONF_GET_DATA",
                payload: res.data
            })
        })
}

export const confirmation = async () => {
    await axios.post(`/confirmation`, {
        id: cookieValueUserID
    })
}

export const resendConfirmationMail = async (dispatch) => {
    await axios.post(`/user/resendconfirmationmail`, {
        id: cookieValueUserID
    })
        .then(response => {
            if (response.data.type === "err") {
                dispatch({
                    type: "ERR_MESSAGE",
                    payload: response.data.payload
                })
            } else {
                dispatch({
                    type: "MESSAGE",
                    payload: response.data.payload
                })
            }
        })
}

