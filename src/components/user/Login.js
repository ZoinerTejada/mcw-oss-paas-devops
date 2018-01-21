import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        axios.post('/api/user/login', { email, password })
            .then((result) => {
                if (result.data.code === 200) {
                    console.log(result.data.success);
                    window.location = '/';
                }
                else if (result.data.code === 204) {
                    alert(result.data.failure);
                }
            });
    }

    register = (e) => {
        e.preventDefault();
        this.props.history.push("/user/register/");
    }

    render() {
        const { email, password } = this.state;

        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Login
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="email">Email Address:</label>
                                <input type="email" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email address" />
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control" name="password" value={password} onChange={this.onChange} />
                            </div>
                            <Button type="submit" bsClass="default">Login</Button>
                        </form>
                    </div>
                    <div class="panel-footer">
                        <div>Not registered yet? Register now!</div>
                        <Button bsClass="default" onClick={(event) => this.register(event)}>Register</Button>
                    </div>
                </div>
            </div>
        );
    }
}