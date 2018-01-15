import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Nav, Navbar, NavItem } from 'react-bootstrap';
import axios from 'axios';
import logo from '../../logo.png'
import './Header.css'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSession: []
        };
    }

    componentDidMount() {
        axios.get('/api/session')
            .then(res => {
                this.setState({ userSession: res.data });
                console.log(this.state.userSession);
            });
    }

    logout(){
        axios.get('/api/user/logout')
          .then((result) => {
            this.props.history.push("/")
          });
      }

    render() {
        return (
            <Navbar inverse fixedTop collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            <img src={logo} height="40" alt="Best For You Organics Company logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            My Plan
                    </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href={this.state.userSession.id ? '/user/profile' : 'user/login'}>
                            {this.state.userSession.name ? 'Welcome ' + this.state.userSession.name : 'Sign In'}
                        </NavItem>
                        {this.state.userSession.id ? <button onClick={this.logout.bind(this)} class="btn btn-outline-danger">Logout</button> : ''}
                        {/* <NavItem eventKey={2} href="#">
                            Add Search Box...
                        </NavItem> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}