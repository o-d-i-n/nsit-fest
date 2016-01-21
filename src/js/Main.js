'use strict'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import EventList from './EventList';
import UserPage from './UserPage';
import Categories from './Categories';
import Category from './Category';


class Index extends Component {
  render() {
    return (
      <div>
        <h1>Index</h1>
        <p>Animations with React Router are not different than any other animation.</p>
      </div>
    )
  }
}

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
          <ReactCSSTransitionGroup component="div" transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {React.cloneElement(this.props.children, {
              key: this.props.location.pathname
            })}
          </ReactCSSTransitionGroup>
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
      <IndexRoute component={Home}/>
      <Route path="user" component={UserPage}/>
      <Route path="events" component={EventList}/>
      <Route path="category" component={Categories}>
        <Route path=":id" component={Category} />
      </Route>
    </Route>
  </Router>
),document.getElementById('root'));
