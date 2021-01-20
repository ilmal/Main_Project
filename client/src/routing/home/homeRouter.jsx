import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getEmailAction } from "../../redux/actions"

import HomePage from "../../pages/home"

const HomeRouter = ()=> {


    return (
        <HomePage/>
        );
}
 
export default HomeRouter;