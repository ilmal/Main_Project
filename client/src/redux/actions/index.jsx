import axios from "axios"

export const fetchUserData = async (dispatch, getState) => {

    let cookieValue = null
    if (document.cookie) {
        cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userID='))
            .split('=')[1];
    }
    await axios.post("http://192.168.1.247:3001/api/user", {
        id: cookieValue,
    })
        .then(res => {
            dispatch({
                type: "FETCH_USER_SUCCESS",
                payload: res.data
            })
        })
}

export const checkUserAuth = async (dispatch) => {
    let cookieValue = null
    if (document.cookie) {
        cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('loginAuth='))
            .split('=')[1];
    }

    await axios.get("http://192.168.1.247:3001/api/user/auth", {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": cookieValue
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
    let cookieValue = null
    if (document.cookie) {
        cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userID='))
            .split('=')[1];
    }

    await axios.post("http://192.168.1.247:3001/api/mcConf/create", {
        id: cookieValue
    })
        .then(res => {
            dispatch({
                type: "DUMP"
            })
        })
}

export const startServer = async (dispatch) => {
    let cookieValue = null
    if (document.cookie) {
        cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userID='))
            .split('=')[1];
    }

    await axios.post("http://192.168.1.247:3001/api/server", {
        id: cookieValue,
        action: "start"
    })
        .then(res => {
            dispatch({
                type: "DUMP"
            })
        })
}

export const stopServer = async (dispatch) => {
    let cookieValue = null
    if (document.cookie) {
        cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userID='))
            .split('=')[1];
    }

    await axios.post("http://192.168.1.247:3001/api/server", {
        id: cookieValue,
        action: "stop"
    })
        .then(res => {
            dispatch({
                type: "DUMP"
            })
        })
}

export const serverPodsInfo = async (dispatch) => {
    let cookieValue = null
    if (document.cookie) {
        cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userID='))
            .split('=')[1];
    }

    await axios.post("http://192.168.1.247:3001/api/k8s/pods", {
        id: cookieValue
    })
        .then(res => {
            console.log(res)
            dispatch({
                type: "SERVER_PODS_DATA",
                payload: res.data
            })
        })
}

export const serverSVCInfo = async (dispatch) => {
    let cookieValue = null
    if (document.cookie) {
        cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userID='))
            .split('=')[1];
    }

    await axios.post("http://192.168.1.247:3001/api/k8s/svc", {
        id: cookieValue
    })
        .then(res => {
            dispatch({
                type: "SERVER_SVC_DATA",
                payload: res.data
            })
        })
}

export const mcConfGetData = async (dispatch) => {
    let cookieValue = null
    if (document.cookie) {
        cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userID='))
            .split('=')[1];
    }

    await axios.post("http://192.168.1.247:3001/api/mcConf/getData", {
        id: cookieValue
    })
        .then(res => {
            dispatch({
                type: "MC_CONF_GET_DATA",
                payload: res.data
            })
        })
}