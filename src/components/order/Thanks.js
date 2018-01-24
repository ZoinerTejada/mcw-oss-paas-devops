import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import axios from 'axios';

export default class Thanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      plan: {},
      user: {}
    };
  }

  componentDidMount() {
    axios.get('/api/order/' + this.props.match.params.id)
      .then(res => {
        console.log('Order data: ', res.data);
        this.setState({ order: res.data });
        console.log('State order: ', this.state.order);

        axios.get('/api/user/' + this.state.order.userId)
          .then(resUser => {
            this.setState({ user: resUser.data });
          });

        axios.get('/api/plan/' + this.state.order.planId)
          .then(resPlan => {
            this.setState({ plan: resPlan.data });
          });
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {'Thanks for your order, ' + this.state.user.firstName + '!'}
            </h3>
            Your order will ship soon.
          </div>
          <div class="panel-body">
            <dl>
              <dt>Order Id:</dt>
              <dd>{this.state.order.id}</dd>
              <dt>Plan:</dt>
              <dd>{this.state.plan.friendlyName}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}