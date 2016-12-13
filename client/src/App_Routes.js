/* eslint-disable */
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import {Router,browserHistory} from 'react-router';
import routes from './clientroutes';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}
