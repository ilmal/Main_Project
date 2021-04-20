import React, { useState, useEffect } from "react";

const MouseCursor = (classContainer) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(false);

    useEffect(() => {

        console.log(classContainer.classContainer)

        const container = document.getElementById(classContainer.classContainer)

        console.log(container)

        addEventListeners(container);
        return () => removeEventListeners(container);
    }, []);

    const addEventListeners = (container) => {
        container.addEventListener("mousemove", onMouseMove);
        container.addEventListener("mouseenter", onMouseEnter);
        container.addEventListener("mouseleave", onMouseLeave);
    };

    const removeEventListeners = (container) => {
        container.removeEventListener("mousemove", onMouseMove);
        container.addEventListener("mouseenter", onMouseEnter);
        container.addEventListener("mouseleave", onMouseLeave);
    };

    const onMouseLeave = () => {
        setHidden(true);
    };

    const onMouseEnter = () => {
        setHidden(false);
    };

    const onMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };



    return <div className="cursor"
        style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            opacity: hidden ? 0 : 1
        }} />
}

export default MouseCursor;