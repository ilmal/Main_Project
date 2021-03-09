import axios from "axios"

export const fetchUserData = async (dispatch, getState) => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('userID='))
        .split('=')[1];

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
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('loginAuth='))
        .split('=')[1];

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
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('userID='))
        .split('=')[1];

    await axios.post("http://192.168.1.247:3001/api/mcConf", {
        id: cookieValue
    })
        .then(res => {
            dispatch({
                type: "DUMP"
            })
        })
}

export const startServer = async (dispatch) => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('userID='))
        .split('=')[1];

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
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('userID='))
        .split('=')[1];

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

export const serverInfo = async (dispatch) => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('userID='))
        .split('=')[1];

    await axios.post("http://192.168.1.247:3001/api/k8s", {
        id: cookieValue
    })
        .then(res => {
            dispatch({
                type: "SERVER_DATA",
                payload: res.data
            })
        })
}
