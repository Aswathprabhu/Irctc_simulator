import React, { Component } from 'react';
import loadingImage from '../images/loading.svg';
import './button-Compo.css';

class Button extends Component {
    
  render() {
    if (this.props.isLoading) {
      var content;
      content = (
        <>
          <img className="svg-load spin" src={loadingImage} alt="Loading" />&nbsp;&nbsp;<span>Loading</span>
        </>
      )
    } else {
      content = this.props.content;
    }
      return (
        <div className={this.props.align}>
          <button name={this.props.name} onClick={this.props.onclick} className={this.props.class}>
              {content}
          </button>
        </div>
      );
  }
}

export default Button;