import React from 'react'
import Input from '../input-Compo/input-Compo';
import Button from '../button-Compo/button-Compo';

const PNR = (props) => {
    return (
        <div className="tc">
            <Input 
                inputClass="input-field input-shadow"
                labelClass="mr2 dark-blue tr dib w-30 label-anime" 
                label="Enter PNR Number"
                type="text"
            />
            <Button 
                onclick={props.pnrValidator} 
                class="f5 link ph3 pv2 mt2 mb2 dib white bg-dark-blue br2" 
                content="Check Status"
            />
        </div>
    );
};

export default PNR;