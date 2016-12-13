/* eslint-disable */
import React from 'react';
import List from './List';

class Display extends React.Component{
    render(){
        return (
      <li id="datalis" className="zoomInUp">
        <List name={this.props.name} img={this.props.img} rating={this.props.rating} price={this.props.price} url={this.props.url}
        price={this.props.price} dist={this.props.dist} city={this.props.city} ppl={this.props.ppl} id={this.props.id}></List>
      </li>
    );
    }
}

export default Display;
