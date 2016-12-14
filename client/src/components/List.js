/* eslint-disable */
import React from 'react';
import store from '../others/store';
import axios from 'axios';
import Modal from './Modal';
import {browserHistory} from 'react-router';

 class List extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isClicked:false,
      isAuthenticated: store.getUser().isAuthenticated,
      userId:store.getUser().id || null,
      ppl:this.props.ppl,
      modalVisibility:"hidden"
    };
  }

  _handleAttend(e){
    if(!this.state.isAuthenticated){
      browserHistory.push('/login');
      return ;
    }
    this.setState({isClicked:!this.state.isClicked});
    this.setState({ppl:this.state.ppl+1});
    axios.post('/eventsAdd',{events:e.target.value})
         .then((response)=>{
           if(response.data.error) browserHistory.push('/login');
         });
  }

  _handleUndo(e){
    this.setState({isClicked:!this.state.isClicked});
    this.setState({ppl:this.state.ppl-1});
    axios.post('/eventsUndo',{events:e.target.value})
         .then((response)=>{
           if(response.data.error) browserHistory.push('/login');
         })
  }
  _handleModal(){
    let el=document.getElementById("uldiv");
    el.style.visibility=(el.style.visibility==="visible")? "hidden":"visible";
    this.setState({modalVisibility:(this.state.modalVisibility=="visible")?"hidden":"visible"});
  }
    render() {

      const attendButton = <button id="attendingButton" value={[this.state.userId,this.props.name,this.props.id,this.props.city]}
      onClick={this._handleAttend.bind(this)}>+attend</button> ;
      const goingButton = <button id="goingButton" value={[this.state.userId,this.props.name,this.props.id,this.props.city]} disabled={!this.state.isAuthenticated}
      onClick={this._handleUndo.bind(this)} className="undo">undo</button>;

    return (
      <div>
      <div id="lidivs">
      <div style={{visibility:this.state.modalVisibility}}>
                            <Modal  _handleModal={this._handleModal.bind(this)}/>
                                  </div>
        <div id="header">
          <p id="name">{this.props.name}</p>
        </div>
        <div id="body">
          <a href={this.props.url} target="_blank" >
          <img id="preview" src={this.props.img} />
          </a>
        </div>
        <div id="footer">
        <div id="footerButtons">
          {(this.state.isClicked) ?  goingButton : attendButton }
          <p id="nofpeople" ><span id="nofpeoplespan">{this.state.ppl}<i id="smiley" className="material-icons">tag_faces</i></span></p>
        <button id="reviewsButton" onClick={this._handleModal.bind(this)}>Reviews</button>
          </div>
          <p id="price">price: {this.props.price}</p>
          <p id="rating">rating: {this.props.rating}</p>
          <p id="distance">distance: {this.props.dist}</p>
        </div>
      </div>
      </div>
    );
  }
}

export default List;
