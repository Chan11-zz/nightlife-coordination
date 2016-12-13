/*global localStorage*/
import React from 'react';
import {Link} from 'react-router';
import store from '../others/store.js';
import setAuth from '../others/set_auth.js';
import {browserHistory} from 'react-router';

class Navigation extends React.Component{

    constructor(){
        super();
        this.state={
            isAuthenticated: null
        };
    }

    componentWillMount(){
       // console.log("")
       console.log("Navigation will mount",store.getUser());
        console.log( store.getUser().isAuthenticated);
        store.getUser();
        store.getUser();
        store.getUser();
        this.setState({isAuthenticated: store.getUser().isAuthenticated});
    }
    componentDidMount(){
        console.log("Navigation mounted");
    }
    _logout(e){
        e.preventDefault();
        localStorage.removeItem('tk');
        console.log("removed tk");
        setAuth(false);
        store.emptyUser();
        this.setState({isAuthenticated : false});
        console.log(store.getUser().isAuthenticated);
        	browserHistory.push('/');
    }

    render(){
        const defaultLinks=[`Login`,`Signup`].map((type,index)=>{
           return <Link className="mdl-navigation__link" to={`/${type}`} key={index}>{type}</Link>;
        });

        const authLinks=<Link className="mdl-navigation__link" to={`/`} onClick={this._logout.bind(this)}>Logout</Link>
        
        return (
            <div id="headerdiv" className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Night Life Coordination</span>
      <span></span>
      <div className="mdl-layout-spacer"></div>
      <nav className="mdl-navigation mdl-layout--large-screen-only">
      {this.state.isAuthenticated ? authLinks : defaultLinks}
      </nav>
    </div>
  </header>
    </div>

            );
    }
}

export default Navigation;
