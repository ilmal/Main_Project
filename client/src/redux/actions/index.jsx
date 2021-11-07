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

// ------------------------------------------------------------------- THIS BELOW IS CURRENTLY NEEDING FIXING --------------------------------

let currentServerID = 0
if (store.getState().serverInfo[store.getState().userHomeData.serverIndex].server_id) currentServerID = store.getState().serverInfo[store.getState().userHomeData.serverIndex].server_id


//setting ip_address to nothing if else isn't specified
let ip_address = ""
if (process.env.REACT_APP_BACKENDPROXY !== undefined) {
    ip_address = process.env.REACT_APP_BACKENDPROXY
}

export const fetchUserData = async (dispatch) => {
    await axios.post(`${ip_address}/user`, {
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
    axios.post(`${ip_address}/user/login`, {
        withCredentials: true,
        name: name.toLowerCase(),
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
    console.log("sending req to signup")
    axios.post(`${ip_address}/user/insert`, {
        data: {
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            password
        }
    })
        .then(async (response) => {
            console.log("response from signup")
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
    await axios.get(`${ip_address}/user/auth`, {
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
                payload: response.data
            })
        })
}

export const authSucess = (dispatch) => {
    dispatch({
        type: "AUTH_SUCCESS"
    })
}

export const createMcConfig = async (dispatch) => {
    await axios.post(`${ip_address}/mcConf/create`, {
        id: cookieValueUserID
    })
        .then(res => {
            console.log("createMcConf Server response: ", res)
        })
}

export const StartServer = async () => {
    await axios.post(`${ip_address}/server`, {
        id: currentServerID,
        action: "start"
    })
        .then(res => {
            console.log("StartServer Server response: ", res)
        })
}

export const StopServer = async () => {
    await axios.post(`${ip_address}/server`, {
        id: currentServerID,
        action: "stop"
    })
        .then(res => {
            console.log("StopServer Server response: ", res)
        })
}

export const serverPodsInfo = async () => {
    await axios.post(`${ip_address}/k8s/pods`, {
        id: currentServerID
    })
        .then(res => {
            store.dispatch({
                type: "SERVER_PODS_DATA",
                payload: res.data
            })
        })
}

export const serverSVCInfo = async (dispatch) => {
    await axios.post(`${ip_address}/k8s/svc`, {
        id: currentServerID
    })
        .then(res => {
            dispatch({
                type: "SERVER_SVC_DATA",
                payload: res.data
            })
        })
}

export const serverTimeInfo = async (dispatch, reset, timeOfReset) => {
    await axios.post(`${ip_address}/k8s/time`, {
        id: currentServerID,
        reset,
        timeOfReset
    })
        .then(res => {
            if (res.data.err) {
                console.error("err occured at response from k8s/time see (actions index)", res.data.err)
            } else {
                dispatch({
                    type: "SERVER_TIME_DATA",
                    payload: res.data
                })
            }
        })
}

export const serverInfo = async (dispatch) => {
    await axios.post(`${ip_address}/mcConf/getData`, {
        id: cookieValueUserID
    })
        .then(res => {
            console.log("SERVER_INFO DATA: ", res.data)
            dispatch({
                type: "SERVER_INFO",
                payload: res.data
            })
        })
}

export const confirmation = async () => { // function never called, see code /components/confirmation/index.jsx, reason is history() method. Fix when time.
}

export const changePass = async () => { // function never called, see code /components/changePass/index.jsx, reason is history() method. Fix when time.
}

export const resendConfirmationMail = async (dispatch) => {
    await axios.post(`${ip_address}/user/resendconfirmationmail`, {
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

export const updatePassMail = async (dispatch, email) => {
    await axios.post(`${ip_address}/user/updatepass`, {
        email
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

export const getQuaryParams = (dispatch) => {
    const urlSearchParams = new URLSearchParams(document.location.search)
    const params = Object.fromEntries(urlSearchParams.entries());
    dispatch({
        type: "QUARY_SELECTOR",
        payload: params
    })
}

export const getCookies = (dispatch) => {
    const cookieObject = {}
    const cookieString = document.cookie
    const cookieArray = cookieString.split(";")
    cookieArray.forEach((element) => {
        const elementArray = element.split("=")
        if (elementArray[0].charAt(0) === " ") {
            elementArray[0] = elementArray[0].slice(1)
        }
        cookieObject[elementArray[0]] = elementArray[1]
    })
    dispatch({
        type: "SET_COOKIES",
        payload: cookieObject
    })
}

