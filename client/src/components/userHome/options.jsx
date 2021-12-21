import { useEffect } from "react"
import ChangeUserOptinos from "./options/changeUserOptinos"
import ChangeUserPass from "./options/changeUserPass"
import Logout from "./options/logout"

const Options = () => {

    useEffect(() => {
        const layoutElement = document.getElementById("random03242jcmvmj0v23cm4")
        layoutElement.style.gridTemplateRows = " auto repeat(7, 11% 3%)"
        layoutElement.style.maxHeight = "110vh"
    })

    return (
        <>
            <ChangeUserOptinos />
            <ChangeUserPass />
            <Logout />
        </>
    )
}

export default Options