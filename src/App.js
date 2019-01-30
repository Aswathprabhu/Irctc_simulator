import React, { Component } from 'react';
import './App.css';
import PNR from "./Pnr-Compo/Pnr-Compo";
import SeatFare from "./SeatFare-Compo/SeatFare-Compo";
import Nav from "./Nav-Compo/Nav-Compo";
class App extends Component {
  state = {
    renderContent:[
      {
        name: 'pnrStatus',
        canShow:false,
        content: <PNR pnrValidator={this.pnrValidator} />
      },
      {
        name: 'seatAvailability',
        canShow:false,
        content: <SeatFare usage="SeatAvailability" seatFareAvailability={this.seatFareChecker} />
      },
      {
        name: 'seatFare',
        canShow:false,
        content: <SeatFare usage="FareChecker" seatFareAvailability={this.seatFareChecker} />
      }
    ]
  }
  canShowComponent = ({target}) => {
    let dummyRenderObjo = {};
    dummyRenderObjo = [...this.state.renderContent];
    dummyRenderObjo.forEach(renderObjo => {
      if(renderObjo.name === target.name) {
        renderObjo.canShow = true;
      } else {
        renderObjo.canShow = false;
      }
    });
    this.setState({
      renderContent: dummyRenderObjo
    });
  }
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

  buttonsObjo = [
    {
      name:'pnrStatus',
      content:'Check PNR',
      class:'white bg-black h2 ma2'
    },
    {
      name: 'seatAvailability',
      content: 'Check Availability',
      class:'white bg-black h2 ma2'
    },
    {
      name: 'seatFare',
      content: 'Check Fare',
      class:'white bg-black h2 ma2'
    }
  ]

  render() {
    let renderContent = this.state.renderContent.reduce((contentsArray, Component) => {
      if(Component['canShow']) {
        contentsArray.push(Component['content'])
      }
      return contentsArray;
    },[]);
    return (
      <div className="App">
        <Nav onclick={this.canShowComponent} buttons={this.buttonsObjo}/>
        {renderContent}
      </div>
    );
  }
}

export default App;
