const Logout = () => {

    const logout = () => {
        document.cookie = "loginAuth= ; path=/; expires = Thu, 01 Jan 2000 00:00:00 GMT"
        document.cookie = "userID= ; path=/; expires = Thu, 01 Jan 2000 00:00:00 GMT"
        window.location.reload()
    }

    return (
        <div className="userHomeSegment userHomeChangeDefaults userHomeLogoutContainerDefaults userHomeLogoutContainer" id="9dso8hybf">
            <button onClick={logout}>Logout</button>
        </div>
    )

}

export default Logout