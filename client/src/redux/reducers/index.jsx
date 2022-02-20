const initailState = {
    user: "default",
    auth: null,
    resetLogin: false,
    serverPods: "default",
    serverSVC: {
        address: "LOADING..."
    },
    serverTIME: {
        timeOfReset: null,
        timeLeft: 0,
        serverShutDown: false
    },
    serverInfo: {},
    userHomeData: null,
    errMessage: false,
    message: false,
    querySelectors: false,
    cookies: false,
    productInfo: null,
    availableServerTeirs: null
}

const Reducer = (state = initailState, action) => {
    switch (action.type) {
        case "FETCH_USER_SUCCESS":
            return {
                ...state,
                user: action.payload
            }
        case "AUTH_SUCCESS":
            return {
                ...state,
                auth: action.payload.auth,
                resetLogin: action.payload.resetLogin
            }
        case "LOGIN":
            document.cookie = `loginAuth=${action.payload.loginAuth};path=/`
            document.cookie = `userID=${action.payload.userID};path=/`
            break;
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
        case "SERVER_TIME_DATA":
            return {
                ...state,
                serverTIME: action.payload
            }
        case "SERVER_INFO":
            return {
                ...state,
                serverInfo: action.payload
            }
        case "USER_HOME_DATA":
            return {
                ...state,
                userHomeData: action.payload
            }
        case "ERR_MESSAGE":
            return {
                ...state,
                errMessage: action.payload
            }
        case "CLEAR_ERR_MESSAGES":
            return {
                ...state,
                errMessage: false
            }
        case "MESSAGE":
            return {
                ...state,
                message: action.payload
            }
        case "CLEAR_MESSAGES":
            return {
                ...state,
                message: false
            }
        case "QUARY_SELECTOR":
            return {
                ...state,
                querySelectors: action.payload
            }
        case "SET_COOKIES":
            return {
                ...state,
                cookies: action.payload
            }
        case "PRODUCT_INFO":
            return {
                ...state,
                productInfo: action.payload
            }
        case "AVAILABLE_SERVER_TEIRS":
            return {
                ...state,
                availableServerTeirs: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default Reducer