import React from 'react';
import './input-Compo.css';
const input = (props) => {
    return (props.label)
    ? (
        <div className="pa2 w-100 fl">
            <label className={props.labelClass}>{props.label}</label>
            <input className={props.inputClass} onChange={props.onchange} name={props.name} type={props.type} />
        </div>
    )
    : (
        <div className="pa2 w-100 fl">
            <input className={props.inputClass} onChange={props.onchange} name={props.name} type={props.type} />
        </div>
    );
}

export default input;