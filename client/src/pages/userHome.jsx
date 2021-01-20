import React, { Component } from 'react';
import axios from "axios"

import SideMenu from "../components/userHome/sideMenu";
import Server from "../components/userHome/server"
import Options from "../components/userHome/options"

class UserHomePage extends Component {
    state = { 
        page: ["server"],
        userData: [{}]
    }

    componentDidMount(){
        axios.get("http://192.168.1.247:3001/api/user/home", {
            headers: {
                "test-header": "test"
            }
        })
            .then(res=>{
                this.setState({
                    userData: res.data
                })
            })
    }

    changeState = (data)=>{
        this.setState({
            page:data
        })
     }

    getPage = ()=>{
         let component
                 switch (this.state.page){
            case "server":
                component = <Server userData={this.state.userData} />
                break;
            case "options":
                component = <Options userData={this.state.userData} />
                break;
            default:
                component = <Server userData={this.state.userData} />
                break;
            }
            return component;
     }

    render() { 
        const { userData } = this.state
        const StateList =()=>{
            return(
                <h1>data: { userData.data }</h1>
            )
        }
        return ( 
            <dir className="userHomeLayout">
                {StateList()}
                <dir className="userHomesideMenu">
                    <SideMenu setState={this.changeState}/>
                </dir>
                {this.getPage()}
            </dir>
         );
    }
}
 
export default UserHomePage;