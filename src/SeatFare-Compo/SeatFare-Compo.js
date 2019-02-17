import React, { Component } from 'react';
import Input from '../input-Compo/input-Compo';
import Button from '../button-Compo/button-Compo';
import Select from '../Select-Compo/Select-Compo';
import moment from 'moment';
import { debounce } from 'throttle-debounce';
import './SeatFare-Compo.css';

class SeatFare extends Component {
  seatFareObjo = {
    'trainNo': {
      'label': "Enter Train No",
      'name': "trainNo",
      'type': 'text'
    },
    'sourceCode': {
      'label': "Enter Source",
      'name': "sourceCode",
      'type': 'select',
      'placeholder': 'Enter Station Name',
      'action': this.handleKeyDown
    },
    'destCode': {
      'label': "Enter Destination",
      'name': 'destCode',
      'type': 'select',
      'placeholder': 'Enter Station Name',
      'action': this.handleKeyDown
    },
    'date': {
      'label': "Enter Date",
      'name': 'date',
      'type': 'date'
    },
    'pref': {
      'label': "Enter Preference",
      'name': 'pref',
      'options': ['1A', '2A', '3A', 'SL', 'FC', 'CC', '2S'],
      'type': 'select',
      'placeholder': 'Choose Option'
    },
    'quotaCode': {
      'label': "Enter Quota",
      'name': 'quotaCode',
      'options': ['GN', 'LD', 'HO', 'DQ', 'tq'],
      'type': 'select',
      'placeholder': 'Choose Option'
    },
    'age': {
      'label': "Enter Age",
      'name': "age",
      'type': 'text'
    },
  }

  state = {
    userObjo: {
      trainNo: null,
      sourceCode: null,
      destCode: null,
      date: null,
      pref: null,
      quotaCode: null,
      age: null
    },
    isLoading: false
  }

  handlePowerChange = (option, name) => {
    let dummySeatObjo = {}
    Object.assign(dummySeatObjo, this.state.userObjo);
    dummySeatObjo[name] = option;
    this.setState({
      userObjo: dummySeatObjo
    });
  }

  handleChange = ({ target }) => {
    let dummySeatObjo = {}
    Object.assign(dummySeatObjo, this.state.userObjo);
    if (target.type === 'date') {
      let date = moment(target.value, 'YYYY-MM-DD').format('DD-MM-YYYY');
      dummySeatObjo[target.name] = date;
    } else {
      dummySeatObjo[target.name] = target.value;
    }
    this.setState({
      userObjo: dummySeatObjo
    });
  }

  callRailwayApi = debounce(1000,async(url) => {
    let response = await this.props.makeNetworkRequest(url)
    console.log(response);
  });

  handleKeyDown(callback, event) {
    let url = `https://api.railwayapi.com/v2/suggest-station/name/${event.target.value}/apikey/mk8unxtdpr`;
    callback(url);
  }

  toggleLoading = (bool) => {
    let isLoading = bool;
    this.setState({
      isLoading
    });
  }

  render() {
    let renderContent = [];
    let inputClass;
    Object.entries(this.seatFareObjo).forEach(([key, value]) => {
      if ((value !== undefined) && !(this.props.usage === "SeatAvailability" && key === 'age')) {
        (key === 'date')
          ? inputClass = "input-field date-input-field input-shadow w-50 dib"
          : inputClass = "input-field input-shadow w-50 dib";
        (value['type'] === 'select')
          ? renderContent.push(

            <Select
              labelClass="ma2 dark-blue tr dib label-width label-anime"
              label={value['label']}
              options={value['options']}
              placeholder={value['placeholder']}
              onchange={this.handleChange}
              onPowerChange={this.handlePowerChange}
              onKeyDown={(event) => value['action'](this.callRailwayApi, event)}
              name={value['name']}
            />

          )
          : renderContent.push(

            <Input
              inputClass={inputClass}
              labelClass="ma2 dark-blue tr dib label-width label-anime"
              label={value['label']}
              type={value['type']}
              onchange={this.handleChange}
              name={value['name']}
            />

          );
      }
    })
    return (
      <div className="dib">
        {renderContent}
        <Button
          onclick={() => this.props.seatFareAvailability(this.state.userObjo, this.props.usage, this.toggleLoading)}
          align="tc pa2"
          class="f5 link ph3 pv2 mb2 mt2 dib white bg-dark-blue br2"
          content={this.props.buttonContent}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default SeatFare;