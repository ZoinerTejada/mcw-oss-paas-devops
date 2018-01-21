import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        axios.get('/api/user/' + this.props.match.params.id)
            .then(res => {
                this.setState({ user: res.data });
                console.log(this.state.user);
            });
    }

    onChange = (e) => {
        const state = this.state.user
        state[e.target.name] = e.target.value;
        this.setState({ user: state });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, address1, address2, city, state, country, postalCode, phone } = this.state.user;

        axios.put('/api/user/' + this.props.match.params.id, { firstName, lastName, email, password, address1, address2, city, state, country, postalCode, phone })
            .then((result) => {
                this.props.history.push("/show/" + this.props.match.params.id)
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Edit Your Information
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="firstName">First Name:</label>
                                <input type="text" class="form-control" name="firstName" value={this.state.user.firstName} onChange={this.onChange} placeholder="First name" />
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name:</label>
                                <input type="text" class="form-control" name="lastName" value={this.state.user.lastName} onChange={this.onChange} placeholder="Last name" />
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address:</label>
                                <input type="email" class="form-control" name="email" value={this.state.user.email} onChange={this.onChange} placeholder="Email address" />
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control" name="password" value={this.state.user.password} onChange={this.onChange} placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <label for="address1">Address:</label>
                                <input type="text" class="form-control" name="address1" value={this.state.user.address1} onChange={this.onChange} placeholder="Address line 1" />
                                <input type="text" class="form-control" name="address2" value={this.state.user.address2} onChange={this.onChange} placeholder="Address line 2" />
                            </div>
                            <div class="form-group">
                                <label for="city">City:</label>
                                <input type="text" class="form-control" name="city" value={this.state.user.city} onChange={this.onChange} placeholder="City" />
                            </div>
                            <div class="form-group">
                                <label for="state">State/Province:</label>
                                <input type="text" class="form-control" name="state" value={this.state.user.state} onChange={this.onChange} placeholder="State/Province" />
                            </div>
                            <div class="form-group">
                                <label for="country">Country:</label>
                                <input type="text" class="form-control" name="country" value={this.state.user.country} onChange={this.onChange} placeholder="Country" />
                            </div>
                            <div class="form-group">
                                <label for="postalCode">Postal Code:</label>
                                <input type="text" class="form-control" name="postalCode" value={this.state.user.postalCode} onChange={this.onChange} placeholder="Postal code" />
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone:</label>
                                <input type="text" class="form-control" name="phone" value={this.state.user.phone} onChange={this.onChange} placeholder="Phone number" />
                            </div>
                            <button type="submit" class="btn btn-success">Save Changes</button>&nbsp;
                            <Link to={`/user/${this.state.user._id}`} class="btn btn-warning">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}