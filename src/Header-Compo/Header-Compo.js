import React from 'react';
import './Header-Compo.css';

const header = (props) => {
  return (
    <div className={props.align}> 
      <h1 className={props.class}>{props.content}</h1>
    </div>
  );
}

export default header;