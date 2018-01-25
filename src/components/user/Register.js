import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: 'Password.1!!',
            address1: '123 Main St.',
            address2: '',
            city: 'Seattle',
            state: 'WA',
            country: 'US',
            postalCode: '98101',
            phone: ''
        };
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, address1, address2, city, state, country, postalCode, phone } = this.state;

        axios.post('/api/user', { firstName, lastName, email, password, address1, address2, city, state, country, postalCode, phone })
            .then((result) => {
                if (result.data.code === 200) {
                    console.log("User registration successful.");
                    window.location = '/';
                }
            });
    }

    render() {
        const { firstName, lastName, email, password, address1, address2, city, state, country, postalCode, phone } = this.state;
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Register
            </h3>
                    </div>
                    <div class="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="firstName">First Name:</label>
                                <input type="text" class="form-control" name="firstName" value={firstName} onChange={this.onChange} placeholder="First name" />
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name:</label>
                                <input type="text" class="form-control" name="lastName" value={lastName} onChange={this.onChange} placeholder="Last name" />
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address:</label>
                                <input type="email" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email address" />
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <label for="address1">Address:</label>
                                <input type="text" class="form-control" name="address1" value={address1} onChange={this.onChange} placeholder="Address line 1" />
                                <input type="text" class="form-control" name="address2" value={address2} onChange={this.onChange} placeholder="Address line 2" />
                            </div>
                            <div class="form-group">
                                <label for="city">City:</label>
                                <input type="text" class="form-control" name="city" value={city} onChange={this.onChange} placeholder="City" />
                            </div>
                            <div class="form-group">
                                <label for="state">State/Province:</label>
                                <input type="text" class="form-control" name="state" value={state} onChange={this.onChange} placeholder="State/Province" />
                            </div>
                            <div class="form-group">
                                <label for="country">Country:</label>
                                <input type="text" class="form-control" name="country" value={country} onChange={this.onChange} placeholder="Country" />
                            </div>
                            <div class="form-group">
                                <label for="postalCode">Postal Code:</label>
                                <input type="text" class="form-control" name="postalCode" value={postalCode} onChange={this.onChange} placeholder="Postal code" />
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone:</label>
                                <input type="text" class="form-control" name="phone" value={phone} onChange={this.onChange} placeholder="Phone number" />
                            </div>
                            <button type="submit" class="btn btn-default">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}