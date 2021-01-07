import React, { Component } from 'react';

class Header extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div >
                    <h3>this is a header</h3>
                </div>
                <div>
                    <a href="/">HOME</a>
                    <a href="/user/login">LOGIN</a>
                    <a href="/user/create">SIGN UP</a>
                    <a href="/user/home">username</a>
                </div>
            </div>            
         );
    }
}
 
export default Header;