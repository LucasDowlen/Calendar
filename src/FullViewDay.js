import React from 'react'
import {useLocation} from 'react-router-dom';

function FullViewDay() {

    const location = useLocation();

    return (
        <div id="fullViewDay">
            <h1>{location.state.day}</h1>
        </div>
    )
}

export default FullViewDay
