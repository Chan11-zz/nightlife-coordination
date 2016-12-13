/* eslint-disable */
import React from 'react';

class Modal extends React.Component{
  constructor(){
    super();
  }

  render(){
    let overlay={
    position                : 'fixed',
    top                     : 80+'px',
    left                    : 0,
    right                   : 0,
    bottom                  : 0,
    opacity                 : 1,
    color                   : 'white',
    backgroundColor        : '#2c3e50'
    }
    let content={
    position                : 'absolute',
    top                     : '100px',
    left                    : '40px',
    right                   : '40px',
    bottom                  : '40px',
    border                  : '1px solid #ccc',
    backgroundColor        : '#2c3e50',
    overflow                : 'auto',
    WebkitOverflowScrolling : 'touch',
    borderRadius            : '4px',
    outline                 : 'none',
    padding                 : '20px',
    color                   : 'white'
    }
    return(
      <div id="modal" style={overlay}>
      <h1 id="reviewsTitle">Reviews</h1><button id="modalClose" onClick={this.props._handleModal}><i className="material-icons">backspace</i></button>
      <div style={content}>
      <ul>
      <li>Ho</li>
      <li>Hi</li>
      <li>Hm</li>
      </ul>
       </div>
      </div>
    );
  }
}

export default Modal;
