import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router';
import queryString from 'query-string';


const Confirmation = () => {
    // redirecting traffic

    const history = useHistory();

    console.log("THIS PATH IS WORKING", window.location.pathname)

    const location = useLocation();

    console.log("queryString.parse: ", queryString.parse(location.search)._id);

    const token = window.location.pathname.replace("/confirmation/", "")
    const id = queryString.parse(location.search)._id

    axios.post(`${process.env.REACT_APP_BACKENDPROXY}/confirmationvalidation`, {
        token,
        id
    }).then(res => {
        history.push("/user/home");
        window.location.reload()
    })

}

export default Confirmation