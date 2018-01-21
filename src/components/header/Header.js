import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import axios from 'axios';
import logo from '../../logo.png'
import './Header.css'

export default class Header extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userId: '',
            userName: ''
        };
    }

    componentDidMount() {
        axios.get('/api/session')
            .then(res => {
                console.log(res.data);
                if (res.data.id) {
                    this.setState({ userId: res.data.id, userName: res.data.name });
                    console.log(this.state);
                }
            });
    }

    logout(){
        axios.post('/api/user/logout')
          .then(res => {
              console.log('User successfully logged out.');
              window.location = '/';
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
                        <NavItem eventKey={1} href="/">
                            Home
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href={this.state.userId ? '/user/' + this.state.userId : 'user/login'}>
                            {this.state.userName ? 'Welcome ' + this.state.userName : 'Sign In'}
                        </NavItem>
                        {this.state.userId ? <button onClick={this.logout.bind(this)} class="btn btn-outline-danger">Logout</button> : ''}
                        {/* <NavItem eventKey={2} href="#">
                            Add Search Box...
                        </NavItem> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}