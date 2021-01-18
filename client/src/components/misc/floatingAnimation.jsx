const FloatingAniamtion = (props)=> {

    let x = 0
    let y = 0
    let xAxis = 0
    let yAxis = 0

    const mouseMoveHandler =(e)=>{
        x = e.screenX 
        y = e.screenY
        axis()
    } 

    const axis = ()=>{
        const container = document.querySelector(".floatOuterContainer")

        xAxis = (x - container.offsetWidth /2) /50
        yAxis = (container.offsetHeight /2 - y) /50
        animation()
    }

    const animation = ()=>{
        const object = document.querySelector(".floatInnerContainer")
        object.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
    }   

    const inside = ()=>{
        const object = document.querySelector(".floatInnerContainer")
        object.style.transition = "none"
    }

    const outside = ()=>{
        const object = document.querySelector(".floatInnerContainer")
        object.style.transition = "1s all ease"
        object.style.transform = `rotateY(0deg) rotateX(0deg)`
    }

    return ( 
    <div className="floatOuterContainer" onMouseEnter={ inside } onMouseLeave={ outside } onMouseMove={ mouseMoveHandler.bind(this)}>
        <div className="floatInnerContainer">
            {props.children}
        </div>
    </div>
    );
}
 
export default FloatingAniamtion;