import React, {useRef} from 'react'
import DeleteIcon from './Icons/DeleteIcon.svg'

export default function Event(props) {

    const eventContainer = useRef();

    let eventText = props.text;

    // var maxTextLength = ((window.innerWidth / 100) * 11.6) / 7.8;

    // if(eventText.length > maxTextLength) {
    //     eventText = eventText.slice(0, maxTextLength) + "...";
    //     console.log("Window: " + window.innerWidth + " ContainerWidth: " + eventContainer);
    //     console.log(maxTextLength + " - Length");
    // }


    return (
        <div className="eventContainer" ref={eventContainer}>
            <div className="event">
                <div className="eventText">
                    {eventText}
                </div>
            </div>
            <div className="removeEvent" onClick={() => props.delete(props.id)}>
                <img src={DeleteIcon} alt="Delete"/>
            </div>
            {/* onClick={props.delete(props.id)} */}
        </div>
    )
}
