import React from 'react'
import Input from '../input-Compo/input-Compo';
import Button from '../button-Compo/button-Compo';

const PNR = (props) => {
    return (
        <div>
            <Input 
                inputClass="inputField inputShadow"
                labelClass="ma2 dark-blue" 
                label="Enter PNR"
                type="text"
            />
            <Button 
                onclick={props.pnrValidator} 
                class="f6 link ph3 pv2 mb2 dib white bg-dark-blue br2" 
                content="Check Status"
            />
        </div>
    );
};

export default PNR;