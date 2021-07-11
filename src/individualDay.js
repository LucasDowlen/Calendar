import React, {useState, useEffect, useRef} from 'react';
import Event from './Event.js';

var inputText;

function IndividualDay(props) {

    const [newClass, setClass] = useState('standardBg');
    // const [stageClass, setStageClass] = useState('menu');
    const [horizontalMargin, setMargin] = useState("14.9vw");
    const [inputValue, setInput] = useState('');

    const [eventList, setList] = useState([]);

    // var InnerSectionHTML;

    let menuBoxRef = useRef();

    var isLeftElement;
    var isCurrentDay;


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0
    var yyyy = today.getFullYear();

    if(props.day === dd && props.month === mm){
        isCurrentDay = "currentDay"
    }

    var subtractTimesInto = Math.floor(props.day / 7) * 7;

    if((props.day - subtractTimesInto) === 1) {
        isLeftElement = "leftElement";
    }

    useEffect(() => {

        const retrievedList = localStorage.getItem(`${props.day} ${props.month} ${yyyy}`);

        if(retrievedList) {
            setList(JSON.parse(retrievedList));
        }

    }, [])

    useEffect(() => {

        console.log(newClass + " - Class");

        localStorage.setItem(`${props.day} ${props.month} ${yyyy}`, JSON.stringify(eventList));

    }, [eventList]);

    useEffect(() => { //may need to combine useEffect hooks (with eventList triggered)

        document.addEventListener("mouseup", (event) => {resetStageClass(event)});
        // document.addEventListener("mouseup", () => {setClass('standardBg')}); //might be unnessesary now

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

        console.log('inputtexthandler');

        inputText = e.target.value; //probably remove
        setInput(e.target.value);
    };

    const addEvent = () => {
        console.log("EventAdded");
        if(inputText != "") { //probably replace inputText with inputValue from state;
            setList([...eventList, inputText])
            setInput("");
            inputText = "";
            console.log(eventList);
        }
    };


    // const checkMargin = () => {

    //     // setStageClass('addEvent')

    //     // if((props.day - subtractTimesInto) % 6 === 0 || (props.day - subtractTimesInto) % 7 === 0){

    //     //     setMargin("-18.2vw"); 
    //     // }

    //     console.log(horizontalMargin);
    // }

    // if(stageClass === 'menu'){
    //     InnerSectionHTML =
    //     <ul>
    //         <div onClick={checkMargin}>Add Event</div>
    //         <div>Add Location</div>
    //         <div>Current Day</div>
    //         <div>Add Alert</div>
    //         <div>Add Invites</div>
    //         <div>Add Notes</div>
    //     </ul>
    // }

    // else if(stageClass === 'addEvent'){
    //     InnerSectionHTML =
        // <ul>
        //     <div className="inputContainer">
        //         <input value={inputValue} onChange={inputTextHandler} placeholder="Add Event"/>
        //         <a onClick={addEvent}>Add</a> 
        //     </div>
        // </ul>
    // }

    const deleteEvent = (identity) => {

        setList(eventList.filter((item, index) => index !== identity));
    }
        //onClick changed to onDoubleClick
    return (
        <div className={`day ${newClass} ${isLeftElement}`} onDoubleClick={() => 
        {
            setClass('selectedBg');

            if((props.day - subtractTimesInto) % 6 === 0 || (props.day - subtractTimesInto) % 7 === 0){
                setMargin("-16.8vw");
            }
        }}>
            <div className={`dayTitle ${isCurrentDay}`}>{props.day}</div>

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
                    <h2>Current Day</h2>
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
                <div className="day-border"></div>
            </div>
        </div>
    );
}

export default IndividualDay;