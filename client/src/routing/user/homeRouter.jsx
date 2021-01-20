// import React, {useState} from "react"
// import SideMenu from "../../components/userHome/sideMenu";
// import Server from "../../components/userHome/server"
// import Options from "../../components/userHome/options"

// const UserHome = ()=>{

//     const [page, setPage] = useState(["server", "options"])

//     const setState = (data)=>{
//         setPage(data)
//     }

//     const getPage = ()=>{
//         let component
//         switch (page){
//             case "server":
//                 component = <Server/>
//                 break;
//             case "options":
//                 component = <Options/>
//                 break;
//             default:
//                 component = <Server/>
//                 break;
//         }
//         return component;
//     }


//     return ( 
//         <dir className="userHomeLayout">
//             <dir className="userHomesideMenu">
//                 <SideMenu setState={setState}/>
//             </dir>
//             {getPage()}
//         </dir>
//     );
// }
 
// export default UserHome;

import UserHomePage from "../../pages/userHome"

const UserHomeRouter = ()=>{
    return (
        <UserHomePage/>
    )
}

export default UserHomePage