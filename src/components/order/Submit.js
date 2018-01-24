import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            userId: '',
            planId: this.props.match.params.planId,
            sendNotification: false,
            creditCardNumber: '4111111111111111',
            cvv: '123',
            userSession: [],
            plan: {},
            user: {}
        };
    }

    componentDidMount() {
        axios.get('/api/session')
            .then(res => {
                if (!res.data.id) {
                    console.log("You are required to be logged in to place an order.");
                    this.props.history.push("/user/login/");
                }
                else {
                    this.setState({ userSession: res.data });
                    console.log(this.state.userSession);
                    this.setState({ userId: this.state.userSession.id });
                    console.log(this.state.userId);

                    axios.get('/api/user/' + this.state.userId)
                        .then(result => {
                            this.setState({ user: result.data });
                            console.log(this.state.user);
                            if (this.state.user.phone && this.state.user.phone != '') {
                                const state = this.state;
                                state['sendNotification'] = true;
                                this.setState(state);
                            }
                        });
                }
            });

        axios.get('/api/plan/' + this.props.match.params.planId)
            .then(res => {
                this.setState({ plan: res.data });
                console.log(this.state.plan);
            });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { orderId, userId, planId, sendNotification, creditCardNumber, cvv } = this.state;

        axios.post('/api/order', { orderId, userId, planId, sendNotification })
            .then((result) => {
                if (result.data.code === 200) {
                    this.props.history.push('/order/thanks/'+result.data.order._id);
                }
            });
    }

    render() {
        const { orderId, userId, planId, sendNotification, creditCardNumber, cvv } = this.state;

        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Place Order for the {this.state.plan.friendlyName}
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Back to all Plans</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="friendlyName">Selected Plan:</label>
                                <input readOnly type="text" class="form-control" name="friendlyName" value={this.state.plan.friendlyName} />
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