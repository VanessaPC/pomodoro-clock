import React, { Component } from 'react';
import { Timer } from './Timer.js';
import './App.css';

// show the countdown on the input 
// if the user enters a negative number, reset it to 0
// if the user clicks ´stop' stop the counter and reset to 0

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                   <Timer />
                </div>
            </div>
        );
    }
}

export default App;
