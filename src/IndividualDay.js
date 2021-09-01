import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import Event from './Event.js';

let inputText;

function IndividualDay(props) {

    const [newClass, setClass] = useState('standardBg');
    // const [stageClass, setStageClass] = useState('menu');
    const [horizontalMargin, setMargin] = useState("14.9vw");
    const [inputValue, setInput] = useState('');

    const [eventList, setList] = useState([]);

    const [span, setSpan] = useState(false);

    // var InnerSectionHTML;

    const history = useHistory();

    let menuBoxRef = useRef();

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
            setList(JSON.parse(retrievedList)); //not parsing correctly
        }

    }, [])

    useEffect(() => {

        console.log(newClass + " - Class");

        localStorage.setItem(`${props.day} ${props.month} ${yyyy}`, JSON.stringify(eventList));

    }, [eventList]);

    useEffect(() => { //may need to combine useEffect hooks (with eventList triggered)

        document.addEventListener("mouseup", (event) => {resetStageClass(event)});
        // document.addEventListener("mouseup", () => {setClass('standardBg')}); //might be unnecessary now

        return () => {
            document.removeEventListener("mouseup", (event) => {resetStageClass(event)});
            // document.removeEventListener("mouseup", () => {setClass('standardBg')});
        }
    }, [newClass]);

    const resetStageClass = (event) => {

        if(newClass === "selectedBg"){
            console.log("selected");
        }

        if(menuBoxRef.current != null && !menuBoxRef.current.contains(event.target) && newClass === 'selectedBg'){
            console.log(menuBoxRef.current + " MenuBoxRef");
            // setStageClass('menu');
            setClass('standardBg'); //allows double click functionality
            // console.log("Not clicking menu");
        }
    };

    const inputTextHandler = (e) => {

        // console.log('input text handler');

        inputText = e.target.value; //probably remove
        setInput(e.target.value);
    };

    const addEvent = () => {
        console.log("EventAdded");
        if(inputText !== "") { //probably replace inputText with inputValue from state;
            setList([...eventList, inputText])
            setInput("");
            inputText = "";
            console.log(eventList);
        }
    };

    const deleteEvent = (identity) => {

        setList(eventList.filter((item, index) => index !== identity));
    }

    // const linkToFullDayView = () => {
    // //     // const history = useHistory();
    // //     // history.push('/day');

    //     console.log("Redirecting...");

    //     history.push('/day');

    //     // return <Redirect to="/day" />
    // }


        //onClick changed to onDoubleClick
    return (
        <div className={`day ${newClass} ${isLeftElement}`} onDoubleClick={() => 
        {
            setClass('selectedBg');

            if((props.day - subtractTimesInto) % 6 === 0 || (props.day - subtractTimesInto) % 7 === 0){
                setMargin("-16.8vw");
            }
        }}>
            <div className={`dayTitle ${isCurrentDay}`} onDoubleClick={() => history.push({pathname: "/day", state: {day: props.day, month: props.month , monthName: props.monthName}})}>{props.day}</div>

            {/* was set to change class based on stageClass - may need to change/edit this */}
            {/* removed menu class which replaced above mentioned issue */}
            <div ref={menuBoxRef} className={`inputSection`} style={{marginLeft: horizontalMargin}}>
                {/* {InnerSectionHTML} */}


                {/* ul and contents new */}
                <ul> 
                    {/* onClick={checkMargin} */}
                    <div className="inputContainer">
                        <input value={inputValue} onChange={inputTextHandler} placeholder="Add Event"/> 

                        <a onClick={addEvent}>Add</a> 
                        <div className="line"/>
                        <div className="line animatedLine"/>
                    </div>

                    {/* <h2 className="locationTitle">Add Location</h2> */}

                    <input className="locationTitle" placeholder="Add Location"/>

                    <div className="addTime">

                        <div className="firstTimeSection">
                            <h3 className="s1title">Time:</h3>

                            <div className="Time">
                                <input placeholder="12" maxLength="2" />
                                <h3>:</h3>
                                <input placeholder="00" maxLength="2" />
                            </div>

                            <h3> Span </h3>
                            <input type="checkbox" className="checkbox" onClick={() => {setSpan(!span)}}/>
                        </div>

                        <div className="TimeContainer">
                            {span === true &&
                            <div className="Time">
                                <input placeholder="12" maxLength="2" />
                                <h3>:</h3>
                                <input placeholder="00" maxLength="2" />
                            </div>}
                        </div>
                    </div>


                    <h2>Add Alert</h2>
                    <h2>Add Invites</h2>
                    <h2>Add Notes</h2>
                </ul>
            </div>
            
            <div>
                <ul className="eventList">
                    {eventList.map((data, eventKey) => {
                        if(data !== ""){
                            return <Event id={eventKey} text={data} delete={deleteEvent} key={props.day * props.month}/>
                        }
                    })}
                </ul>
                <div className="day-border" />
            </div>
        </div>
    );
}

export default IndividualDay;