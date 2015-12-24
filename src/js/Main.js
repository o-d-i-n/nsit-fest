'use strict'

import React from 'react';
let { Component } = React;
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import EventList from '../EventList';
import UserPage from '../UserPage';
import Categories from '../Categories';
import Category from '../Category';

class Home extends Component {
  render() {
    return (
      <h1> Here we do fancy stuff </h1>
    );
  }
}
class App extends Component {
  constructor(p) {
    super(p);
  }
  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container-fluid">
            <h1> NSIT Fests</h1>
          </div>
        </div>
        <ul className="nav nav-tabs nav-justified">
          <li><Link to={`/`}>Home</Link></li>
          <li><Link to={`/events`}>Events</Link></li>
          <li><Link to={`/user`}>Users</Link></li>
          <li><Link to={`/category`}>Categories</Link></li>
        </ul>
        <div className="container">
          {this.props.children || <Home />}
        </div>
      </div>
    );
  }
}

class ServerError extends Component {
  render() {
    return (
      <div>
        <h1> NSIT Fests</h1>
        <h1> We couldn't fetch the request &#128542; </h1>
      </div>
    );
  }
}

ReactDOM.render((
  <Router>
    <Route path="/" component={App} >
      <Route path="user" component={UserPage}/>
      <Route path="events" component={EventList}/>
      <Route path="category" component={Categories}>
        <Route path=":id" component={Category} />
      </Route>
    </Route>
  </Router>
),document.getElementById('root'));
