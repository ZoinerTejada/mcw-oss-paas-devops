import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get('/api/user/'+this.props.match.params.id)
      .then(res => {
        this.setState({ user: res.data });
        console.log(this.state.user);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.state.user.firstName + ' ' + this.state.user.lastName}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>User Id:</dt>
              <dd>{this.state.user._id}</dd>
              <dt>First Name:</dt>
              <dd>{this.state.user.firstName}</dd>
              <dt>Last Name:</dt>
              <dd>{this.state.user.lastName}</dd>
              <dt>Email Address:</dt>
              <dd>{this.state.user.email}</dd>
              <dt>Address1:</dt>
              <dd>{this.state.user.address1}</dd>
              <dt>Address2:</dt>
              <dd>{this.state.user.address2}</dd>
              <dt>City:</dt>
              <dd>{this.state.user.city}</dd>
              <dt>State/Province:</dt>
              <dd>{this.state.user.state}</dd>
              <dt>Country:</dt>
              <dd>{this.state.user.country}</dd>
              <dt>Postal Code:</dt>
              <dd>{this.state.user.postalCode}</dd>
              <dt>Phone:</dt>
              <dd>{this.state.user.phone}</dd>
            </dl>
            <Link to={`/user/edit/${this.state.user._id}`} class="btn btn-warning">Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}