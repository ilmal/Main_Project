import { useHistory } from "react-router-dom";

const Boubbles = () => {

    const history = useHistory();

    const clickHandler = () => {
        history.push("/message/home");
        window.location.reload();
    }

    return (
        <div className="bubbleContainer" onClick={clickHandler}>
            <div className="defaultBubble helpBubble fas fa-comments">
                <div className="bubbleAlert">
                    <div className="bubbleAlertCenter" />
                </div>
            </div>
            {/* <div className="defaultBubble twitterBubble fab fa-twitter" />
            <div className="defaultBubble instagramBubble fab fa-instagram" /> */}
        </div>
    );
}

export default Boubbles;

