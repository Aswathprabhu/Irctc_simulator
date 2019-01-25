import React, { Component } from 'react'

export default class Select extends Component {
    render() {
        let optionArray = [];
        this.props.options.forEach(option => {
            return optionArray.push(<option value={option} onChange={this.props.onchange}>{option}</option>);
        })
        return (
            <div className="pa2 w-100">
                <label className={this.props.labelClass}>{this.props.label}</label>
                <select className="input-shadow" id="pet-select">
                    <option value="">--- Choose an option ---</option>
                    {optionArray}
                </select>
            </div>
        )
    }
}