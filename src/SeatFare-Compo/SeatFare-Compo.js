import React, {Component} from 'react';
import Input from '../input-Compo/input-Compo';
import Button from '../button-Compo/button-Compo';
import Select from '../Select-Compo/Select-Compo';

class SeatFare extends Component {
        seatFareObjo= {
            'trainNo': {
                'label': "Enter Train No",
                'name': "trainNo",
                'type': 'text'            
            },
            'sourceCode': {
                'label': "Enter Source",
                'name': "sourceCode",
                'type': 'text'            
            },
            'destCode': {
                'label': "Enter Destination",
                'name': 'destCode',
                'type': 'text'                        
            },
            'date': {
                'label': "Enter Date",
                'name': 'date',
                'type': 'date'
            },
            'pref': {
                'label': "Enter Preference",
                'name': 'pref',
                'options': ['GN', 'LD', 'HO','DQ','tq'],
                'type': 'select'               
            },
            'quotaCode': {
                'label': "Enter Quota",
                'name': 'quotaCode',
                'options': ['1A', '2A', '3A', 'SL', 'FC', 'CC', '2S'],
                'type': 'select'                
            },
            'age': {
                'label': "Enter Age",
                'name': "age",
                'type': 'text'                
            },
        }

    state = {
        userObjo: {
            trainNo:null,
            sourceCode:null,
            destCode:null,
            date:null,
            pref:null,
            quoteCode:null,
            age:null
        }
    }

    handleChange = ({ target }) => {
        console.log(target.value);
        console.log(target.value);
        let dummySeatObjo = {}
        Object.assign(dummySeatObjo,this.state.userObjo);
        dummySeatObjo[target.name] = target.value;
        this.setState({
            userObjo: dummySeatObjo
        });
    }

    render() {
        let renderContent = [];
        let inputClass;
        Object.entries(this.seatFareObjo).forEach(([key, value]) => {
            if(value !== undefined) {
                (key === 'date') 
                    ? inputClass = "input-field date-input-field input-shadow w-50 dib"
                    : inputClass = "input-field input-shadow w-50 dib";
                (value['type'] === 'select')
                    ? renderContent.push(
                        <Select 
                            labelClass="ma2 dark-blue w-50 tr dib"
                            label={value['label']}
                            options={value['options']}
                            onchange={this.handleChange}
                        />
                    )
                    : renderContent.push(
                        <Input
                            inputClass= {inputClass}
                            labelClass="ma2 dark-blue w-50 tr dib"
                            label={value['label']}
                            type={value['type']}
                            onchange={this.handleChange}
                            name={value['name']}
                        />
                    );
            }
        })
        return(
            <div className="w-100">
                {renderContent}
                <Button
                    onclick={() => this.props.seatFareAvailability(this.state.userObjo)}
                    align="tc pa2"
                    class="f5 link ph3 pv2 mb2 dib white bg-dark-blue br2"
                    content="Check Availability"
                />
                
            </div>
        );
    }
}

export default SeatFare;