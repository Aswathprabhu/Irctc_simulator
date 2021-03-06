import React, { Component } from 'react';
import './App.css';
import PNR from "./Pnr-Compo/Pnr-Compo";
import SeatFare from "./SeatFare-Compo/SeatFare-Compo";
import Nav from "./Nav-Compo/Nav-Compo";
import Header from "./Header-Compo/Header-Compo";
import anime from 'animejs/anime.js';
import VerticallyCenteredModal from './Modal-Compo/Modal-Compo';

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

  modalClose = () => this.setState({ showModal: false });

  callRailwayAPI = (url) => {
    return fetch(url).then(res => res.json()).then(res => res).catch(err => console.log(err));
  }

  pnrValidator = async () => {
    let url = `https://api.railwayapi.com/v2/pnr-status/pnr/4707981579/apikey/mk8unxtdpr/`;
    var response = await this.callRailwayAPI(url);  
    console.log(response);
  }

  seatFareChecker = async (userObjo, usage, toggleLoading) => {
    toggleLoading(true);
    let url, modalObjo;
    if (usage === 'FareChecker') {
      modalObjo = {
        modalHeader: 'Fare Checker',
        modalContentHeader: "For Preferred Quota:",
      }
     url = `https://api.railwayapi.com/v2/fare/train/${userObjo['trainNo']}/source/${userObjo['sourceCode']}/dest/${userObjo['destCode']}/age/${userObjo['age']}/pref/${userObjo['pref']}/quota/${userObjo['quotaCode']}/date/${userObjo['date']}/apikey/mk8unxtdpr/`;
    } else {
        modalObjo = {
        modalHeader: 'Seat Availability',
        modalContentHeader: "Available Seats:",
      }
      url = `https://api.railwayapi.com/v2/check-seat/train/${userObjo['trainNo']}/source/${userObjo['sourceCode']}/dest/${userObjo['destCode']}/date/${userObjo['date']}/pref/${userObjo['pref']}/quota/${userObjo['quotaCode']}/apikey/mk8unxtdpr/`;
    }
    var response = await this.callRailwayAPI(url);
    this.setState({
        showModal: true,
        showModalContent: <VerticallyCenteredModal
                            modalHeader={modalObjo.modalHeader}
                            modalContentHeader={modalObjo.modalContentHeader}
                            modalContent={response.fare || response.availability[0].status}
                            show='true'
                            onHide={this.modalClose}
                          />
    });
    toggleLoading(false);
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
        canShow: false 
      },
      {
        name: 'seatAvailability',
        canShow: false
      },
      {
        name: 'seatFare',
        canShow: false
      }
    ],
    showModal: false,
    showModalContent: <VerticallyCenteredModal 
                        modalHeader =''
                        modalContentHeader=''
                        modalContent = ''
                        show ='true' 
                        onHide = {this.modalClose} 
                      />,
    animateComponents: true         
  }

  contentObjo = {
    pnrStatus:  <PNR 
                  isLoading={this.state.isLoading} 
                  pnrValidator={this.pnrValidator} 
                />,
    seatAvailability: <SeatFare 
                        isLoading={this.state.isLoading} 
                        usage="SeatAvailability" 
                        seatFareAvailability={this.seatFareChecker}
                        makeNetworkRequest={this.callRailwayAPI} 
                        buttonContent="Check Availability"
                      />,
    seatFare: <SeatFare 
                isLoading={this.state.isLoading} 
                usage="FareChecker" 
                seatFareAvailability={this.seatFareChecker} 
                makeNetworkRequest={this.callRailwayAPI}
                buttonContent="Check Fare"
              />
  }

  animate = (props) => {
    anime({
      targets: props.targets,
      translateY: props.translateY,
      translateX: props.translateX,
      duration: props.duration,
      opacity: [1, 0],
      direction: 'reverse',
      easing: 'easeInOutSine',
    });
  }

  componentDidUpdate() {
    if (this.state.animateComponents) {
      this.animate(
        {
          targets: '.container',
          translateX: 0,
          translateY: 300,
          duration: 500
        }
      );
      this.animate(
        {
          targets: ['.input-field', '.power-anime'],
          translateX: 50,
          translateY: 0,
          duration: 700
        }
      );
      this.animate(
        {
          targets: '.label-anime',
          translateX: -50,
          translateY: 0,
          duration: 700
        }
      );
      this.setState({
        animateComponents: false
      });
    }
  }

  render() {
    let showModal;
    let renderContent = this.state.renderContent.reduce((contentsArray, Component) => {
      if(Component['canShow']) {
        contentsArray.push(this.contentObjo[Component['name']])
      }
      return contentsArray;
    },[]);
      
    (this.state.showModal) 
      ? (showModal = this.state.showModalContent)
      : (showModal = null);
  
    return (
      <div className="App">
        <Nav onclick={this.canShowComponent} buttons={this.buttonsObjo}/>
        <Header
          align="tc"
          class="f2 ma4 dark-blue lobster-font"
          content="The IRCTC Simulator"
        />
        <div className="container"> 
          {renderContent}
        </div>
        {showModal}
      </div>
    );
  }
}

export default App;
