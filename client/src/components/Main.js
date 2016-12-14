/* eslint-disable */
import React from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import Display from './Display';
import store from '../others/store';

class Main extends React.Component{
    constructor(){
        super();
        this.state={
          search_term:"",
          results:[],
          attendedEvents:[],
          peopleAttending:[]
        };
        this._handleChange=this._handleChange.bind(this);
        this._handleSubmit=this._handleSubmit.bind(this);
        this._handleLogOut=this._handleLogOut.bind(this);
    }

    componentWillMount(){
        this.setState({
            results:store.getUser().events||[],
            peopleAttending:store.getUser().othersEvents||[]
        });
    }
    componentDidMount(){
        if(store.getUser().isAuthenticated){
            store.getUser()._handleLogout=this._handleLogOut;
        }
    }
    _handleLogOut(){
        this.setState({results:[]});
        localStorage.removeItem("tk");
    }
    _handleChange(e){
        e.preventDefault();
        this.setState({search_term:e.target.value});
    }
    _handleSubmit(e){
        e.preventDefault();
        if(!this.state.search_term || /^\s*$/.test(this.state.search_term)) return;
        this.setState({results:[],peopleAttending:[]});
        axios.post('/search',{search:this.state.search_term})
            .then((response)=>{
                this.setState({results:response.data.businesses});
                store.setUserEvents(response.data.businesses);
            });
            axios.post('/getEvents',{search:this.state.search_term})
            .then((response)=>{
                this.setState({peopleAttending:(response.data.length) ? response.data : []});
                store.setOthersEvents(response.data);
            });
    }
    render(){
        let people,peopleAttending=this.state.peopleAttending;
        if(this.state.results.length){
            var data=this.state.results.map((item,index)=>{
                   people=this.state.peopleAttending.filter((x)=>{
                    return item.name==x.name;
                });
                return <Display name={item.name} img={item.image_url} rating={item.rating} price={item.price} url={item.url} price={item.price}
                dist={item.distance} id={item.id} city={item.location.city} ppl={people.length||0}   key={index}/> ;
            });
        }
        return (
            <div>
          <Navigation />
            <div className="mdl-layout mdl-js-layout">
            <div id="searchComponent">
              <div id="title-icons">
              <i id="bar-icon" className="material-icons md-48">local_bar</i>
              <i id="restaurant-icon" className="material-icons md-48">restaurant</i>
              <i id="group-icon" className="material-icons md-48">group</i>
              </div>
            <h1 id="title">Night Life Coordination</h1>
            <form onSubmit={this._handleSubmit}>
            <div id="search-bar">
          <input  type="text" onChange={this._handleChange}/>
              </div>
            <button id="search-button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                          Search
                        </button>
         </form>
         </div>
         <ul id="uldiv" style={{visibility:"visible"}}>
         {data || this.state.search_term&&<img src="http://i.imgur.com/If9taov.gif" />}
         </ul>
         <div className="footer">desinged & coded by <a href="https://github.com/Chan11/" target="_blank">
           <strong>Chandrahas</strong></a></div>
            </div>
            </div>
            );
    }
}

export default Main;
