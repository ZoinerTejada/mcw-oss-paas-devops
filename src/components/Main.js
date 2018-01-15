import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MissingRoute from './MissingRoute';
import Order from './order/Order';
import Plans from './plan/Plans';
import User from './user/User';
import './Main.css';

export default class Main extends Component {
    render() {
      return (
        <main role="main">
            <Switch>
                <Route exact path='/' component={Plans}/>
                <Route path='/order/' component={Order}/>
                <Route path='/user/' component={User}/>
                <Route component={MissingRoute}/>
            </Switch>
        </main>
      );
    }
}