import { fetchUserData, checkUserAuth, createMcConfig, serverPodsInfo, serverSVCInfo, serverInfo, getQuaryParams, getCookies, productInfo } from "../redux/actions/index"
import store from "../store"

// see attached link: https://stackoverflow.com/questions/50924814/node-js-wait-for-multiple-async-calls-to-finish-before-continuing-in-code for sayn execution 

const basicReq = () => {
    store.dispatch(checkUserAuth)
    store.dispatch(getQuaryParams)
    store.dispatch(productInfo)
    store.dispatch(getCookies)
    console.log("1")
}


const userReq = () => {
    store.dispatch(createMcConfig)
    store.dispatch(serverPodsInfo)
    store.dispatch(serverSVCInfo)
    store.dispatch(serverInfo)
    console.log("4")
}


export default async () => {
    await basicReq()
    console.log("2")

    if (store.getState().cookies.userID !== undefined && store.getState().cookies.userID === "") return  // cheking if user is logged in

    await store.dispatch(fetchUserData)

    console.log("3")

    if (store.getState()?.user?.past_servers?.length <= 0) return  // cheking if user have/ had a server

    await userReq()
    console.log("5")

    console.log("data after fetch func: ", store.getState())

    // check if loginReset is true, if case, resetting cookies
    if (store.getState().resetLogin) {
        const cookieKey = ["loginAuth", "userID"]
        cookieKey.forEach(element => {
            document.cookie = `${element}=;path=/;expires=Thu, 01 Jan 1970T00:00:00Z;`
        })
        store.dispatch({
            type: "AUTH_SUCCESS",
            payload: {
                auth: store.getState().auth,
                resetLogin: false
            }
        })
    }
}







// export default Promise.all([

// ]).then(async () => {
//     console.log("2")
//     if (store.getState().cookies.userID !== undefined && store.getState().cookies.userID !== "") { // cheking if user is logged in
//         await store.dispatch(fetchUserData)
//         if (store.getState().user.past_servers.length > 0) { // cheking if user have/ had a server
//             Promise.all([

//             ]).then(() => {

//             })
//         }
//     }
// })

