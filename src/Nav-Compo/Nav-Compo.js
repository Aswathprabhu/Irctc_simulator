import React from 'react';
import Button from '../button-Compo/button-Compo';
import './Nav-Compo.css';

const Nav = (props) => {
  let renderContent = props.buttons.map(button => {
    return(
        <Button
          align='pa2 dib'
          name={button.name}
          class={button.class}
          content={button.content}
          onclick={props.onclick}
        />
    );
  })
  return(
    <div className="nav-compo tc">
      {renderContent}
    </div>
  );
}
export default Nav;