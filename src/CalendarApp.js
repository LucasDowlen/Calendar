import React, {Component} from 'react';
import IndividualDay from './IndividualDay';
import {BiLeftArrowAlt, BiRightArrowAlt} from "react-icons/bi";


class CalendarApp extends Component {

constructor() {
    super();

    this.state = {
        months: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],

        monthAbbr: [ //probably remove month abbreviations and possibly functions which assign them;
            "Jan.",
            "Feb.",
            "Mar.",
            "Apr.",
            "May,",
            "June",
            "Jul.",
            "Aug.",
            "Sept.",
            "Oct.",
            "Nov.",
            "Dec."
        ],
      
        list: [],

        currentMonth: 0, 
        //january is 0

        monthName: "",

        id: 0,

        currentIndividualDaysList: [],

        // theseEvents: ""
    };
}

    componentWillMount() {

        let today = new Date();
        let currentMonth = today.getMonth();

        this.startCalender(currentMonth);
    }


  startCalender = (month) => {

    // var today = new Date();
    // var dd = String(today.getDate());
    // var mm = String(today.getMonth() + 1); //January is 0!
    // var yyyy = today.getFullYear();

    // today = mm + '/' + dd + '/' + yyyy;
    // console.log(today);

    //this.setState({theseEvents: "nel"}); //not breaking it???

    
    this.setState({currentMonth: month});

    let newList = [];

    console.log(this.state.months + " Months");
    for (let day = 0; day < this.state.months[month]; day++) {
        newList.push(day + 1);
    }
    this.setState({
        list: newList,
        monthName: this.state.monthNames[month]
    });
  };

  changeMonth = (changeAmount) => {

    let theCurrentMonth = this.state.currentMonth;
    theCurrentMonth += changeAmount;

    if (theCurrentMonth > 11) theCurrentMonth = 0;
    else if (theCurrentMonth < 0) theCurrentMonth = 11;

    console.log("MonthValue: " + theCurrentMonth);

    this.setState({currentMonth: theCurrentMonth});

    this.startCalender(theCurrentMonth);

    console.log("New MonthValue: " + this.state.currentMonth);
};

    // saveDailyEvents = (day, month, year) => {
    //      const createKey = `${month} ${day} ${year}`;
    //     // const test = `${month} ${day} ${newEvent}`

    //     // this.setState({theseEvents: "nel"}); //breaking events 

    //     this.setState({theseEvents: createKey});

    //     // if (newKey in this.state.eventsDictionary){
    //     //     //...
    //     // }

    //     // else{
    //     //     //this.setState({eventsDictionary[newKey]: newEvent})
    //     // }
    // }

render() {
    return (
        <div className="App">
            <div className="header">
                <div id="displayDate">{this.state.monthName}</div>


                <div id="arrowsContainer">
                    <BiLeftArrowAlt className="arrowIcon leftArrow" onClick={() => this.changeMonth(-1)}/> 
                    <BiRightArrowAlt className="arrowIcon rightArrow" onClick={() => this.changeMonth(1)}/>
                    {/* Left and Right - Arrow styles in the ClassName might be unnecessary */}
                </div>

            </div>
            <div className="daysContainer">
                {this.state.list.map((data) => {

                    // var newId = this.state.id + 1;
                    // this.setState({id: newId});

                    // this.state.id += 1;

                    //generate key correctly (bug)

                    return <IndividualDay key={`${data} ${this.state.currentMonth}`} day={data} month={this.state.currentMonth} monthName={this.state.monthNames[this.state.currentMonth]} logUpdate = {(day) => { //fix here and in fullviewday
                        console.log(data + " " + day);
                        //this.state.eventsDictionary[`{this.state.monthNames(this.state.currentMonth)} {data}`] = this.state.list;
                        //console.log(this.state.eventsDictionary);
                        //use the day and month to create a key to persist the events.
                        
                    }}/>; //removed passing moth abbreviation
                })}
            </div>
        </div>
    );
  }
}

export default CalendarApp;
