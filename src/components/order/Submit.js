import React, { Component } from 'react';
//import Plan from './Plan';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Col, Grid, Well, Button } from 'react-bootstrap';
import logo from '../../logo.png';
//import './Order.css';

export default class Submit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerId: '',
            planId: this.props.match.params.planId,
            dayToProcess: 2,
            creditCardNumber: '4111111111111111',
            cvv: '123',
            userSession: []
        };
    }

    componentDidMount() {
        axios.get('/api/session')
            .then(res => {
                if(!res.data.id) {
                    console.log("You are required to be logged in to place an order.");
                    this.props.history.push("/user/login/");
                }
                else {
                    this.setState({ userSession: res.data });
                    console.log(this.state.userSession);
                    this.setState({customerId: this.state.userSession.id});
                    console.log(this.state.customerId);
                }
            });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { customerId, planId, dayToProcess, creditCardNumber, cvv } = this.state;

        axios.post('/api/order', { customerId, planId, dayToProcess })
            .then((result) => {
                alert(JSON.stringify(result));
                if (result.data.code == 200) {
                    alert('Order processed succesfully. Order Number: ' + result.data.order._id);
                    this.props.history.push("/order/thanks")
                }
                
            });
    }

    render() {
        const { customerId, planId, dayToProcess, creditCardNumber, cvv } = this.state;

        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Place Order for plan {this.state.planId}
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Back to all Plans</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                {/* TODO: Retrieve list of plans, and display plan name here as read-only.*/}
                                <label for="planId">Select Plan:</label>
                                <input type="text" class="form-control" name="planId" value={planId} onChange={this.onChange} placeholder="Selected Plan" />
                            </div>
                            <div class="form-group">
                                <label for="lastName">Day you would like your shipments sent each week:</label>
                                <select class="form-control" name="dayToProcess" value={dayToProcess} onChange={this.onChange}>
                                    <option value="2">Monday</option>
                                    <option value="3">Tuesday</option>
                                    <option value="4">Wednesday</option>
                                    <option value="5">Thursday</option>
                                    <option value="6">Friday</option>
                                    <option value="7">Saturday</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="creditCardNumber">Credit Card Number:</label>
                                <input type="number" class="form-control" name="creditCardNumber" value={creditCardNumber} onChange={this.onChange} placeholder="Credit Card Number" />
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV:</label>
                                <input type="password" class="form-control" name="cvv" value={cvv} onChange={this.onChange} placeholder="CVV" />
                            </div>
                            <button type="submit" class="btn btn-default">Place Order</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}