import React, { Component } from 'react';
import { PowerSelect } from 'react-power-select';
import 'react-power-select/dist/react-power-select.css';

export default class Select extends Component {

    state = {};

    handleChange = ({ option }) => {
        this.setState({
            selectedOption: option
        });
        this.props.onPowerChange(option, this.props.name);
    }

    render() {
        let style = {
            width: '40%',
            display: 'inline-block',
            height: '32px',
            paddingTop: '8px'
        }
        let optionArray = [];
        if(this.props.options) {
          this.props.options.forEach(option => {
              return optionArray.push(<option value={option}>{option}</option>);
          })
        }
        return (
            <div className="pa2 w-100 fl">
                <label className={this.props.labelClass}>{this.props.label}</label>
                <div className="power-anime" style={style}>
                    <PowerSelect
                        placeholder={this.props.placeholder}
                        options={this.props.options}
                        selected={this.state.selectedOption}
                        onChange={this.handleChange}
                        onKeyDown={this.props.onKeyDown}
                    />
                </div>
            </div>
        )
    }
}