const getEmail = (state = 50, action)=>{
    
    const getJSON = ()=>{
        const response = fetch("http://192.168.1.247:3001/api/user/home")
        return response.json()
    }   

    // if(action.type === "EMAIL"){
    //     return data().then(resp=>{
    //         console.log(resp.data)
    //         return resp.data
    //     })
    // }

    switch(action.type){
        case "EMAIL":
            return (
                async ()=>{
                    const data = await getJSON()
                    console.log(data)
                    return data
                }
            )();
        default:
            console.log("bye")
            return state
    }
}

export default getEmail