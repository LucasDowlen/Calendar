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

        list: [],

        currentMonth: 0, //january is 0
        monthName: "",
        id: 0,

        currentIndividualDaysList: [],
    };
}

    componentWillMount() {

        let today = new Date();
        let currentMonth = today.getMonth();

        this.startCalender(currentMonth);
    }


  startCalender = (month) => {
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

render() {
    return (
        <div className="App">
            <div className="header">
                <div id="displayDate">{this.state.monthName}</div>


                <div id="arrowsContainer">
                    <BiLeftArrowAlt className="arrowIcon leftArrow" onClick={() => this.changeMonth(-1)}/> 
                    <BiRightArrowAlt className="arrowIcon rightArrow" onClick={() => this.changeMonth(1)}/>
                </div>

            </div>
            <div className="daysContainer">
                {this.state.list.map((data) => {
                    return <IndividualDay key={`${data} ${this.state.currentMonth}`} day={data} month={this.state.currentMonth} monthName={this.state.monthNames[this.state.currentMonth]} logUpdate = {(day) => { //fix here and in fullviewday
                        console.log(data + " " + day);
                    }}/>;
                })}
            </div>
        </div>
    );
  }
}

export default CalendarApp;
