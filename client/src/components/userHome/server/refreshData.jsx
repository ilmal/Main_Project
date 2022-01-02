import { fetchUserData, serverPodsInfo, serverSVCInfo, serverInfo } from "../../../redux/actions"
import TimeUpdate from "./timeUpdate"

const refreshData = (e, store, userData) => {
    store.dispatch(fetchUserData)
    store.dispatch(serverPodsInfo)
    store.dispatch(serverSVCInfo)
    store.dispatch(serverInfo)

    // TimeUpdate(false, store, userData)

    // spin animation
    const elements = document.getElementsByClassName(e.target.className)
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.classList.add("spinAnimation")
        setTimeout(() => {
            element.classList.remove("spinAnimation")
        }, 1000)
    }
}

export default refreshData;