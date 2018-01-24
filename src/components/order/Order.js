import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Submit from './Submit';
import Thanks from './Thanks';

export default class Order extends Component {
    render() {
      return (
        <Switch>
            <Route exact path='/order/thanks/:id' component={Thanks}/>
            <Route path='/order/:planId' component={Submit}/>
        </Switch>
      );
    }
}