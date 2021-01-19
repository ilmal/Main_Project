const homeRouter = ()=> {

    const Gettingdata = ()=>{
        fetch("http://192.168.1.247:3001/api/user/home")
        .then((resp)=>{
            return resp.json()
        })
        .then(data=>{
            return(
                <h2>{data.data}</h2>
            )
        })
        .catch(err=>{
            console.log("1: ", err)
        })
    }

    return (
        <>
            <h1>this is the home page from home file</h1>
        </>
        );
}
 
export default homeRouter;