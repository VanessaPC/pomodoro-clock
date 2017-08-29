import React, { Component } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import 'moment-duration-format';
import './Timer.css';


export class Timer extends Component {
  constructor (){
    super();

    this.state = {
          name: '',
          maxTime : 0,
          date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
          time: moment.duration(0),
          workingTime: moment.duration(0),
          breakTime: moment.duration(0)
      }

     this.onAddition = this.onAddition.bind(this);
     this.onSubstraction = this.onSubstraction.bind(this);
     this.onStart = this.onStart.bind(this);
     this.onStop = this.onStop.bind(this);
     this.onPause = this.onPause.bind(this);
     this.onSave = this.onSave.bind(this);
     this.onClear = this.onClear.bind(this);

     this.interval;
  }
  
  // I want to keep a function that adds to the number that is being displayed 
  // on the timer 
  onAddition(e) {
    let timer = this.state.time;

    timer = timer.add(parseInt(e.target.value), 'minutes');
    console.log(timer.format('H:mm:ss'));

    this.setState({time: timer});

  }

  // I want to keep a function that substracts from the number displayed on the timer 
  onSubstraction(e) {
  let timer = this.state.time;
  timer = timer.subtract(parseInt(e.target.value), 'minutes');
  this.setState({time: timer});

  }

    // I want to start a count down fromt he Max Time we calculated the user wanted and count down to 0.  
  onStart() {
     this.interval = window.setInterval( (time) => {
        let timer = this.state.time;
        if (this.state.workingTime.as('seconds') !== 0) {
            let timer = this.state.workingTime;
        } else {
            let timer = this.state.breakTime;
        }
      let seconds = moment.duration(timer, 'HH:mm:ss').asSeconds();
        
          if (seconds > 0){
            timer = timer.subtract(1, 'seconds');
            seconds --;
            this.setState({time: timer});  

          } else if (seconds === 0) {
            clearInterval(this.interval);
          }     
       
      }, 1000);
  }

  // On finish I want to reset the counter, and values, to allow the user to start again 
  onStop() {
    clearInterval(this.interval);
    this.setState({
      time: moment.duration(0)
    })
  }


// When the user wants to pause the action, it should pause but should not clear the interval 
  onPause() {
    clearInterval(this.interval);
    
  }

// creating a task to go through 
  onSave() {
    let lapse = this.state.time;
    // I want the time to be rest, after working time is updated, 

    if (this.state.workingTime.as('seconds') === 0) {
      this.setState({
        time: moment.duration(0),
        workingTime: lapse
      });
    } else {
      this.setState({
        time: moment.duration(0),
        breakTime: lapse
      })
    }
   
  }

  onClear() {
    this.setState({
      name: '',
      maxTime : 0,
      date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      time: moment.duration(0),
      workingTime: moment.duration(0),
      breakTime: moment.duration(0)
    })
    clearInterval(this.interval);

  }

  

  render() {
    const timer = this.state.time.as('seconds');
    let workTime = this.state.workingTime.format('H:mm:ss', ({trim:false}));
    let breakT = this.state.breakTime.format('H:mm:ss', ({trim:false}));
    let timing;

    if (timer > 30) {
      timing = this.state.time.format('H:mm:ss', {trim:false});
    } else {
      timing = this.state.time.format('ss')+' seconds';
    }

    return (
      <div>
      <p> {this.state.date}
      </p>
      
     
      <div>
        <p> {timing} </p>
      </div>
       <button onClick={this.onStart} name="start" >
                 Start 
          </button> 
          <button onClick={this.onStop} name="stop" >
                 Stop 
          </button> 
          <button onClick={this.onPause} name="pause" >
                 Pause 
          </button> 
       
          <button onClick={this.onAddition} name="+" value="5"> +
          </button>
          <div> 5 </div>
          <button onClick={this.onSubstraction} name="-" value="5"> -
          </button>

          <button onClick={this.onAddition} name="+" value="25"> +
          </button>
          <div> 25 </div>
          <button onClick={this.onSubstraction} name="-" value="25"> -
          </button>
          <button onClick={this.onSave} name="save"> Save </button>
          <button onClick={this.onClear} name="clear"> Clear </button>

          <div> this is the working time 
            <p> {workTime} </p>
          </div>
          <div> this is the break time 
            <p> {breakT} </p>
          </div>
      </div>
    );
  }
}
