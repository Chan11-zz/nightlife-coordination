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
        this.setState({isAuthenticated: store.getUser().isAuthenticated});
    }

    _logout(e){
        e.preventDefault();
        localStorage.removeItem('tk');
        setAuth(false);
        store.emptyUser();
        this.setState({isAuthenticated : false});
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
