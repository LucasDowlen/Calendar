import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import Event from './Event.js';

function IndividualDay(props) {

    const [newClass, setClass] = useState('standardBg');
    // const [stageClass, setStageClass] = useState('menu');
    const [horizontalMargin, setMargin] = useState("14.9vw");
    const [inputValue, setInput] = useState('');
    const [hourInput, setHour] = useState(''); //new
    const [minuteInput, setMinute] = useState(''); //newer
    const [endingHour, setEndingHour] = useState(''); //new
    const [endingMinute, setEndingMinute] = useState(''); //newer

    const [location, setLocatoin] = useState('');


    const [eventList, setList] = useState([]);

    const [span, setSpan] = useState(false);

    // var InnerSectionHTML;

    const history = useHistory();

    let menuBoxRef = useRef();

    let inputText;

    let isLeftElement;
    let isCurrentDay;


    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth(); //January is 0
    let yyyy = today.getFullYear();

    if(props.day === dd && props.month === mm){
        isCurrentDay = "currentDay"
    }

    let subtractTimesInto = Math.floor(props.day / 7) * 7;

    if((props.day - subtractTimesInto) === 1) {
        isLeftElement = "leftElement";
    }

    useEffect(() => {

        const retrievedList = localStorage.getItem(`${props.day} ${props.month} ${yyyy}`);
        console.log(`${props.day} ${props.month} ${yyyy}`);

        if(retrievedList) {
            setList(JSON.parse(retrievedList));
        }

    }, [])

    useEffect(() => {

        console.log(newClass + " - Class");

        localStorage.setItem(`${props.day} ${props.month} ${yyyy}`, JSON.stringify(eventList));

    }, [eventList]);

    useEffect(() => {

        document.addEventListener("mouseup", (event) => {resetStageClass(event)});

        return () => {
            document.removeEventListener("mouseup", (event) => {resetStageClass(event)});
        }
    }, [newClass]);

    const resetStageClass = (event) => {

        if(newClass === "selectedBg"){
            console.log("selected");
        }

        if(menuBoxRef.current != null && !menuBoxRef.current.contains(event.target) && newClass === 'selectedBg'){
            console.log(menuBoxRef.current + " MenuBoxRef");
            setClass('standardBg');
        }
    };

    const inputTextHandler = (e) => {
        setInput(e.target.value);
    };

    const addEvent = () => {
        console.log("EventAdded");
        if(inputText !== "") {
            console.log(inputValue + ' Test');
            setList([...eventList, [inputValue, [hourInput, minuteInput, endingHour, endingMinute], location]]);
            setInput("");
            inputText = "";
            console.log(eventList);
        }
    };

    const deleteEvent = (identity) => {
        setList(eventList.filter((item, index) => index !== identity));
    }

    const setTime = (e, timeValueSet) => {
        if(timeValueSet === 0) {

            if(e.target.value.toString().slice(-2) > 23) return;

            if(e.target.value.toString().length === 3 && hourInput.toString().charAt(0) !== "0") return;

            setHour(("0" + e.target.value).slice(-2));
        }
        else if (timeValueSet === 1) {

            if(e.target.value.toString().slice(-2) > 59) return;

            if(e.target.value.toString().length === 3 && minuteInput.toString().charAt(0) !== "0") return;

            setMinute(("0" + e.target.value).slice(-2));
        }
        else if (timeValueSet === 2) {

            if(e.target.value.toString().slice(-2) > 24) return;

            if(e.target.value.toString().length === 3 && endingHour.toString().charAt(0) !== "0") return;

            setEndingHour(("0" + e.target.value).slice(-2));
        }
        else if (timeValueSet === 3) {

            if(e.target.value.toString().slice(-2) > 60) return;

            if(e.target.value.toString().length === 3 && endingMinute.toString().charAt(0) !== "0") return;

            setEndingMinute(("0" + e.target.value).slice(-2));
        }
    }

    return (
        <div className={`day ${newClass} ${isLeftElement}`} onDoubleClick={() => 
        {
            setClass('selectedBg');

            if((props.day - subtractTimesInto) % 6 === 0 || (props.day - subtractTimesInto) % 7 === 0){
                setMargin("-15.8vw");
            }
        }}>
            <div className={`dayTitle ${isCurrentDay}`} onDoubleClick={() => history.push({pathname: "/day", state: {day: props.day, month: props.month , monthName: props.monthName}})}>{props.day}</div>
            <div ref={menuBoxRef} className={`inputSection`} style={{marginLeft: horizontalMargin, marginTop: '1.4vw'}}>
                <ul>
                    <div className="inputContainer">
                        <input value={inputValue} onChange={inputTextHandler} placeholder="Add Event"/>

                        <a onClick={addEvent}>Add</a> 
                        <div className="line"/>
                        <div className="line animatedLine"/>
                    </div>

                    <input className="locationTitle" placeholder="Add Location" value={location} onChange={(e) => {setLocatoin(e.target.value)}}/>

                    <div className="addTime">

                        <div className="firstTimeSection">
                            <h3 className="s1title">Time:</h3>

                            <div className="Time">
                                <input value={hourInput} onChange={(e) => setTime(e, 0)} placeholder="00" type="number"/>
                                <h3>:</h3>
                                <input value={minuteInput} onChange={(e) => setTime(e, 1)} placeholder="00" type="number" />
                            </div>

                            <h3> Span </h3>
                            <input type="checkbox" className="checkbox" onClick={() => {setSpan(!span)}}/>
                        </div>

                        <div className="TimeContainer">
                            {span === true &&
                            <div className="Time">
                                <input value={endingHour} onChange={(e) => setTime(e, 2)} placeholder="00" type="number" />
                                <h3>:</h3>
                                <input value={endingMinute} onChange={(e) => setTime(e, 3)} placeholder="00" type="number" />
                            </div>}
                        </div>
                    </div>
                </ul>
            </div>
            
            <div>
                <ul className="eventList">
                    {eventList.map((data, eventKey) => {
                        if(data[0] !== ""){
                            console.log(data[0]);
                            return <Event id={eventKey} text={data[0]} delete={deleteEvent} key={props.day.toString() + props.month.toString() + eventKey.toString()}/>
                        }
                    })}
                </ul>
                <div className="day-border" />
            </div>
        </div>
    );
}

export default IndividualDay;