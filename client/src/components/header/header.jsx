const  Header = ()=> {
    return ( 
        <div className="headerBanner">
            <div className="headerInnerBanner">
                <div >
                    <span>U1Servers</span>
                </div>
                <div>
                    <a href="/user/login">LOGIN</a>
                    <a href="/user/signup">SIGN UP</a>
                    <a href="/user/home">USERNAME</a>
                </div>
            </div>
        </div>            
    );
}
 
export default Header;