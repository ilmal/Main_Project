import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getEmailAction } from "../../redux/actions"

const HomeRouter = ()=> {

    // const getEmails = useSelector(state => state.getEmailAction)
    const dispatch = useDispatch()

    return (
        <>
            <h1>this is the home page from home file</h1>
            <h2>ConnectionToDb: {}</h2>
            <button onClick={()=> dispatch(getEmailAction())}>click me</button>
        </>
        );
}
 
export default HomeRouter;