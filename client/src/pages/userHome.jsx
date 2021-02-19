import React, { Component } from 'react';
import axios from "axios"

import SideMenu from "../components/userHome/sideMenu";
import Server from "../components/userHome/server"
import Options from "../components/userHome/options"

import { store } from "../index"
import { fetchUserData } from "../redux/reducers/user"

class UserHomePage extends Component {
    state = { 
        page: ["server"],
        userData: store.getState().fetchUserData
    }

    componentDidMount(){        
        store.dispatch(fetchUserData)
        console.log("1",store.getState().fetchUserData.user)
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
        return ( 
            <dir className="userHomeLayout">
                <dir className="userHomesideMenu">
                    <SideMenu setState={this.changeState}/>
                </dir>
                {this.getPage()}
            </dir>
         );
    }
}
 
export default UserHomePage;