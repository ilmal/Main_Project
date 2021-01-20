const  Header = ()=> {
    return ( 
        <div className="headerBanner">
            <div className="headerInnerBanner">
                <div >
                    <span>This is a header</span>
                </div>
                <div>
                    <a href="/">HOME</a>
                    <a href="/user/login">LOGIN</a>
                    <a href="/user/signup">SIGN UP</a>
                    <a href="/user/home">username</a>
                </div>
            </div>
        </div>            
    );
}
 
export default Header;