import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom';

import IndividualHourBar from './individualHourBar';

function FullViewDay() {

    //get month as number not name

    const location = useLocation();

    let today = new Date();
    let yyyy = today.getFullYear();

    const [eventList, setList] = useState([]);


    // setTimeout(() => {
    //     console.log(location.state.day + " " + location.state.month + " " + yyyy);
    // }, 1000)

    let hoursArray = [];

    for (let i = 0; i < 24; i++) {
        hoursArray.push(i + 1);
    }

    useEffect(() => {

        const retrievedList = localStorage.getItem(`${location.state.day} ${location.state.month} ${yyyy}`);

        console.log(`retrievedList ${location.state.day} ${location.state.month} ${yyyy}`);

        if(retrievedList) {

            console.log("run2");
            setList(JSON.parse(retrievedList));
        }

    }, [])

    return (
        <div id="fullViewDay">
            <header>
                <h1 className="Month"> {location.state.monthName} </h1>
                <h1 className="Day"> {location.state.day} </h1>
            </header>

            <div className="hourBars">
                {hoursArray.map((value) => {
                    console.log('one');
                    return <IndividualHourBar hour={value} key={value} />
                })}


                <div className="events">
                    {eventList.map((value, index) => {
                        return <div key={index}> {value} </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default FullViewDay
