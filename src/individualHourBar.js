import React from 'react';

export default function IndividualHourBar(props) {

    return(
        <div className="hour">
            <div> {props.hour}:00 </div>
        </div>
    )
}