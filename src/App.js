import React, { Component } from 'react';
import './App.css';
import PNR from "./Pnr-Compo/Pnr-Compo";
import SeatFare from "./SeatFare-Compo/SeatFare-Compo";
import Nav from "./Nav-Compo/Nav-Compo";
import Header from "./Header-Compo/Header-Compo"
class App extends Component {

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
 seatFareChecker = async (userObjo, usage) => {
   let url;
   if (usage === 'FareChecker') {
     url = `https://api.railwayapi.com/v2/fare/train/${userObjo['trainNo']}/source/${userObjo['sourceCode']}/dest/${userObjo['destCode']}/age/${userObjo['age']}/pref/${userObjo['pref']}/quota/${userObjo['quotaCode']}/date/${userObjo['date']}/apikey/mk8unxtdpr/`;
   } else {
     url = `https://api.railwayapi.com/v2/check-seat/train/${userObjo['trainNo']}/source/${userObjo['sourceCode']}/dest/${userObjo['destCode']}/date/${userObjo['date']}/pref/${userObjo['pref']}/quota/${userObjo['quotaCode']}/apikey/mk8unxtdpr/`;
     console.log(url);
   }
   var response = await this.callRailwayAPI(url)
    console.log(response);
  }

  buttonsObjo = [
    {
      name: 'pnrStatus',
      content: 'Check PNR',
      class: 'f6 link ba ph3 pv2 dib white bg-transparent button-shadow'
    },
    {
      name: 'seatAvailability',
      content: 'Check Availability',
      class: 'f6 link ba ph3 pv2 dib white bg-transparent button-shadow'
    },
    {
      name: 'seatFare',
      content: 'Check Fare',
      class: 'f6 link ba ph3 pv2 dib white bg-transparent button-shadow'
    }
  ]

  state = {
    renderContent: [
      {
        name: 'pnrStatus',
        canShow: false,
        content: <PNR pnrValidator={this.pnrValidator} />
      },
      {
        name: 'seatAvailability',
        canShow: false,
        content: <SeatFare usage="SeatAvailability" seatFareAvailability={this.seatFareChecker} />
      },
      {
        name: 'seatFare',
        canShow: false,
        content: <SeatFare usage="FareChecker" seatFareAvailability={this.seatFareChecker} />
      }
    ]
  }

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
        <Header
          align="tc"
          class="dark-blue lobster-font"
          content="The IRCTC Simulator"
        />
        <div className="container"> 
          {renderContent}
        </div>
      </div>
    );
  }
}

export default App;
