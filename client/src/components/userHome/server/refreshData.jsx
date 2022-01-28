import { serverPodsInfo } from "../../../redux/actions"
import store from "../../../store"

const refreshData = (e) => {
    store.dispatch(serverPodsInfo)

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