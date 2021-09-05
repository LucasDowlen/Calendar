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
                        console.log(value);

                        let distanceBetween;
                        let margin;

                        if (value[1][2] !== "") {

                            let endingMinute;

                            value[1][3] === "" ? endingMinute = "00" : endingMinute = value[1][3];

                            let firstValueSet = parseInt(value[1][0]) * 60 + parseInt(value[1][1]) - 60;
                            let secondValueSet = parseInt(value[1][2]) * 60 + parseInt(endingMinute);

                            margin = firstValueSet / 60 * (95.9 / 12); //last caculation in parenthesis is the width in vw of a single hour section.
                            distanceBetween = ((secondValueSet - firstValueSet) / 60 * (95.9 / 12));

                            console.log(distanceBetween);
                        }

                        else if (value[1][0] !== "") {
                            margin = ((parseInt(value[1][0]) * 60 + parseInt(value[1][1])) / 60 * (95.9 / 12));
                            distanceBetween = 95.9 / 12;
                        }

                        else {
                            distanceBetween = 191.8
                            margin = 0;
                        }

                        distanceBetween = distanceBetween.toString() + "vw";
                        margin = margin.toString() + "vw";

                        return <div key={index} style={{marginLeft: margin, width: distanceBetween}}> {value[0]}   Temp: {value[1][0]}:{value[1][1]} </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default FullViewDay
