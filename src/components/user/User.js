import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import Edit from './Edit';

export default class User extends Component {
    render() {
      return (
        <Switch>
            <Route path='/user/edit/:id' component={Edit}/>
            <Route path='/user/login' component={Login}/>
            <Route path='/user/register' component={Register}/>
            <Route path='/user/:id' component={Profile}/>
        </Switch>
      );
    }
}