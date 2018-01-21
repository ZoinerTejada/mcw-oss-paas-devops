import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Col, Grid, Row, Well } from 'react-bootstrap';
import logo from '../../logo.png';
import './Plans.css';

export default class Plans extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plans: []
        };
    }

    componentDidMount() {
        axios.get('/api/plan')
            .then(res => {
                this.setState({ plans: res.data });
                console.log(this.state.plans);
            });
    }

    render() {
        const plans = this.state.plans;

        let planLogo = <img src={logo} alt="Best For You Organics Company logo" class="logo" />;

        const planCatalog = plans.map(plan => {
            return (
                <Col xs={12} sm={4} md={4}>
                    <Well>
                        <div class="plan-wrapper">
                            <div class="plan">
                                <div class="name">{plan.friendlyName}</div>
                                <div class="description">
                                    <div class="plan-details">
                                        {planLogo}
                                        <h2 class="persons">{plan.portionSize}</h2>
                                        <div class="meals-per-week">{plan.mealsPerWeek}</div>
                                    </div>
                                    <div>{plan.description}</div>
                                </div>
                                <div class="plan-price">
                                    <div class="price-block">
                                        <span class="price">${plan.price}</span>
                                        <span class="week">/Week</span>
                                    </div>
                                    <Link to={'/order/' + plan._id} class="btn btn-warning">Select this plan</Link>
                                </div>
                            </div>
                        </div>
                    </Well>
                </Col>
            );
        });

        return (
            <div class="container">
                <Grid>
                    <div class="plans">
                        <Row>{planCatalog}</Row>
                    </div>
                </Grid>
                <hr />

                <div class="how-it-works">
                    <div class="content">
                        <h2 class="title">How It Works</h2>
                        <ul class="list">
                            <li>
                                <div class="text-container">
                                    <div class="title">We Create</div>
                                    <div class="text">Our chefs create delicious, whole-foods-based recipes with 100% natural ingredients.</div>
                                </div>
                            </li>
                            <li>
                                <div class="text-container">
                                    <div class="title">We Deliver</div>
                                    <div class="text">Each week, we will send you a variety of meals, made up of fresh ingredients in the correct portions.</div>
                                </div>
                            </li>
                            <li>
                                <div class="text-container">
                                    <div class="title">You Cook</div>
                                    <div class="text">You will perform a little be of prep work, and cook unique, amazing meals that you’ll love.</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}