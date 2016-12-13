import React from 'react';
import {Route,IndexRoute} from 'react-router';

import App from './components/App';
import Login from './components/Login';
import Main from './components/Main';
import Signup from './components/Signup'

export default (
    <Route path="/" component={App}>
    <IndexRoute component={Main} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
    </Route> 
    );
