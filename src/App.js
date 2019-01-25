import React, { Component } from 'react';
import './App.css';
import PNR from "./Pnr-Compo/Pnr-Compo";
import SeatFare from "./SeatFare-Compo/SeatFare-Compo";

class App extends Component {
  callRailwayAPI = (url) => {
    return fetch(url).then(res => res.json()).then(res => res).catch(err => console.log(err));
  }
  pnrValidator = () => {
    let pnrNumber = document.getElementById('pnrNumber').value;
    // fetch(`https://api.railwayapi.com/v2/pnr-status/pnr/${pnrNumber}/apikey/mk8unxtdpr/`)
    //     .then(res => res.json())
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
  }
 seatFareChecker = async (userObjo) => {
   console.log(userObjo);
   var response = await this.callRailwayAPI(`https://api.railwayapi.com/v2/fare/train/${userObjo['trainNo']}/source/${userObjo['sourceCode']}/dest/${userObjo['destCode']}/age/${userObjo['age']}/pref/${userObjo['pref']}/quota/${userObjo['quotaCode']}/date/${userObjo['date']}/apikey/mk8unxtdpr/`)
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        {/* <PNR pnrValidator={this.pnrValidator} /> */}
        <SeatFare seatFareAvailability={this.seatFareChecker} />
      </div>
    );
  }
}

export default App;
