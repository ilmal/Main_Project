import { useHistory } from "react-router-dom";
import ReactTooltip from 'react-tooltip';

const Boubbles = () => {

    const history = useHistory();

    const clickHandler = () => {
        history.push("/message/home");
        window.location.reload();
    }

    return (
        <>
            <div className="bubbleContainer" onClick={clickHandler}>
                <div className="defaultBubble helpBubble fas fa-comments" data-tip data-for="SupportBubble">
                    <div className="bubbleAlert">
                        <div className="bubbleAlertCenter" />
                    </div>
                </div>
                {/* <div className="defaultBubble twitterBubble fab fa-twitter" />
            <div className="defaultBubble instagramBubble fab fa-instagram" /> */}
            </div>
            <ReactTooltip id="SupportBubble" delayShow="100">
                <p>Support & Feature requests</p>
            </ReactTooltip>
        </>
    );
}

export default Boubbles;

