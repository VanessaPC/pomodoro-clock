import React, { Component } from 'react';
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
            time: moment.duration(0)
        }
  
       this.onAddition = this.onAddition.bind(this);
       this.onSubstraction = this.onSubstraction.bind(this);
       this.onStart = this.onStart.bind(this);
       this.onStop = this.onStop.bind(this);
       this.onPause = this.onPause.bind(this);
  
       this.interval = 0;
    }
    
    // I want to keep a function that adds to the number that is being displayed 
    // on the timer 
    onAddition(e) {
      let timer = this.state.time;
  
      timer = timer.add(parseInt(e.target.value, 10), 'seconds');
      console.log(timer.format('H:mm:ss'));
  
      this.setState({time: timer});
  
    }
  
    // I want to keep a function that substracts from the number displayed on the timer 
    onSubstraction(e) {
    let timer = this.state.time;
    timer = timer.subtract(parseInt(e.target.value, 10), 'seconds');
    this.setState({time: timer});
  
    }
  
      // I want to start a count down fromt he Max Time we calculated the user wanted and count down to 0.  
    onStart() {
     
     this.interval = window.setInterval( (time) => {
  
        let timer = this.state.time;
        let seconds = moment.duration(timer, 'HH:mm:ss').asSeconds();
     console.log('here')
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
  
  // On pause, I want to pause the interval, but be able to restart it anytime.
    onPause() {
      clearInterval(this.interval);
    }
  
    
  
    render() {
      const timer = this.state.time.as('seconds');
      let timing;
     console.log(timer)
  
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
         
            <button onClick={this.onAddition} name="+" value="5"> +
            </button>
            <div> 5 </div>
            <button onClick={this.onSubstraction} name="-" value="5"> -
            </button>
  
            <button onClick={this.onAddition} name="+" value="10"> +
            </button>
            <div> 10 </div>
            <button onClick={this.onSubstraction} name="-" value="10"> -
            </button>
            <button onClick={this.onStart} name="start" >
                   Start 
            </button> 
            <button onClick={this.onStop} name="stop" >
                   Stop 
            </button> 
            <button onClick={this.onPause} name="pause" >
                   Pause 
            </button> 
        </div>
      );
    }
  }