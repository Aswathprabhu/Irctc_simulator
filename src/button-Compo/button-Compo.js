import React from 'react';

const button = (props) => {
    return (
       <div className={props.align}>
           <button onClick={props.onclick} className={props.class}>
               {props.content}
           </button>
       </div> 
    );
}

export default button;