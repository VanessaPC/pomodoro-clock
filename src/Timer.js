import React, { Component } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import './Timer.css';


export class Timer extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      maxTime: 0,
      date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
      time: moment.duration(0),
      workingTime: moment.duration(0),
      breakTime: moment.duration(0)
    };

    this.onAdditionWork = this.onAdditionWork.bind(this);
    this.onSubstractionWork = this.onSubstractionWork.bind(this);
    this.onAdditionBreak = this.onAdditionBreak.bind(this);
    this.onSubstractionBreak = this.onSubstractionBreak.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onClear = this.onClear.bind(this);

    this.interval;
  }

  // I want to keep a function that adds to the number that is being displayed
  // on the timer
  onAdditionWork(e) {
    let timer = this.state.workingTime;

    timer = timer.add(parseInt(e.target.value, 10), "minutes");
    console.log(timer.format("H:mm:ss"));

    this.setState({ workingTime: timer });
  }

  // I want to keep a function that substracts from the number displayed on the timer
  onSubstractionWork(e) {
    let timer = this.state.workingTime;
    timer = timer.subtract(parseInt(e.target.value, 10), "minutes");
    this.setState({ workingTime: timer });
  }

  // I want to keep a function that adds to the number that is being displayed
  // on the timer
  onAdditionBreak(e) {
    let timer = this.state.breakTime;

    timer = timer.add(parseInt(e.target.value, 10), "minutes");
    console.log(timer.format("H:mm:ss"));

    this.setState({ breakTime: timer });
  }

  // I want to keep a function that substracts from the number displayed on the timer
  onSubstractionBreak(e) {
    let timer = this.state.breakTime;
    timer = timer.subtract(parseInt(e.target.value, 10), "minutes");
    this.setState({ breakTime: timer });
  }

  // I want to start a count down fromt he Max Time we calculated the user wanted and count down to 0.
  onStart() {
    let timer;
    this.interval = window.setInterval(time => {
      if (this.state.workingTime.as("seconds") !== 0) {
        timer = this.state.workingTime;
      } else {
        timer = this.state.breakTime;
      }
      if (this.state.workingTime.as("seconds") < 0) {
        this.setState({
          time: moment.duration(0),
          workingTime: moment.duration(0)
        });
      } else if (this.state.breakTime.as("seconds") < 0) {
        this.setState({
          time: moment.duration(0),
          breakTime: moment.duration(0)
        });
      }
      // let timer = this.state.time;
      let seconds = moment.duration(timer, "HH:mm:ss").asSeconds();
      console.log("here");
      if (seconds > 0) {
        timer = timer.subtract(1, "seconds");
        seconds--;
        this.setState({ time: timer });
      } else if (seconds <= 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  // On finish I want to reset the counter, and values, to allow the user to start again
  onStop() {
    clearInterval(this.interval);
    this.setState({
      time: moment.duration(0)
    });
  }

  // When the user wants to pause the action, it should pause but should not clear the interval
  onPause() {
    clearInterval(this.interval);
  }

  onClear() {
    this.setState({
      name: "",
      maxTime: 0,
      date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
      time: moment.duration(0),
      workingTime: moment.duration(0),
      breakTime: moment.duration(0)
    });
    clearInterval(this.interval);
  }

  render() {
    const timer = this.state.time.as("seconds");
    let workTime = this.state.workingTime.format("H:mm:ss", { trim: false });
    let breakT = this.state.breakTime.format("H:mm:ss", { trim: false });
    let timing;

    if (timer > 30) {
      timing = this.state.time.format("H:mm:ss", { trim: false });
    } else {
      timing = this.state.time.format("ss") + " seconds";
    }

    return (
      <div>
        <div className="container">
          <div className="date-display">
            <h3>
              Today is {" "}{this.state.date}
            </h3>
          </div>
        </div>
        <div className="main-container-controls">
          <div className=" left controls-container">
            <div className="text-reading">
              {" "}Active time
              <p className="number"> {workTime} </p>
            </div>
            <button
              onClick={this.onAdditionWork}
              name="+"
              value="5"
              className="text calc-button one"
            >
              {" "}+
            </button>
            <div className="number calc-number two"> 5 </div>
            <button
              onClick={this.onSubstractionWork}
              name="-"
              value="5"
              className="text calc-button three"
            >
              {" "}-
            </button>
            <button
              onClick={this.onSubstractionWork}
              name="-"
              value="25"
              className="text calc-button four"
            >
              {" "}-
            </button>
            
            <div className="number calc-number five"> 25 </div>
            <button
              onClick={this.onAdditionWork}
              name="+"
              value="25"
              className="text calc-button six"
            >
              {" "}+
            </button>

          </div>
          <div className="right controls-container">
            <div className="text-reading">
              {" "}Break
              <p className="number"> {breakT} </p>
            </div>
            <button
              onClick={this.onAdditionBreak}
              name="+"
              value="5"
              className="text calc-button one"
            >
              {" "}+
            </button>
            <div className="number calc-number two"> 5 </div>
            <button
              onClick={this.onSubstractionBreak}
              name="-"
              value="5"
              className="text calc-button three"
            >
              {" "}-
            </button>
            <button
              onClick={this.onSubstractionBreak}
              name="-"
              value="25"
              className="text calc-button four"
            >
              {" "}-
            </button>
            <div className="number calc-number five"> 25 </div>
            <button
              onClick={this.onAdditionBreak}
              name="+"
              value="25"
              className="text calc-button six"
            >
              {" "}+
            </button>
            
          </div>
        </div>
        <div className="control-buttons space-top">
          <button onClick={this.onClear} name="clear" className="text">
            {" "}Clear times
            {" "}
          </button>
        </div>
        <div className="container">
          <div className="counter-display">
            <div className="circle">
              <p className="number-timer"> {timing} </p>
            </div>
          </div>
          <div className="control-buttons">
            <button onClick={this.onStart} name="start" className="text">
              Start
              {" "}
            </button>
            <button onClick={this.onStop} name="stop" className="text">
              Stop
              {" "}
            </button>
            <button onClick={this.onPause} name="pause" className="text">
              Pause
              {" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
