'use strict'

import React from 'react';
let { Component } = React;
import { Link } from 'react-router';

class Event extends Component {
  render() {
    let classVal = "col-md-6 event-card "+this.props.data.category;
    return (
      <div className={classVal}>
        <h3>{this.props.data.title} <small><Link to={`/category/${this.props.data.category}`}>{this.props.data.category}</Link></small></h3>
        <div className="row">
          <div className="col-md-6"><i className="fa fa-calendar-times-o"></i>  {this.props.data.last_date}</div>
          <div className="col-md-6"><i className="fa fa-calendar"></i>  {this.props.data.event_date}</div>
        </div>
        <p>{this.props.data.desc}</p>
      </div>
    )
  }
}

export default class EventList extends Component {
  constructor(p) {
    super(p);
    this.state = { 
      keyword: "",
      data: [],
    };
    $.getJSON('/json/events.json', d => this.setState({data: d.events}));
  }
  searchHandler (e) {
    this.setState({ keyword: e.currentTarget.value || "" })
  }
  searchFilter (d) {
    let lowerCaseKeyword = this.state.keyword.toLowerCase();
    return [d.title, d.desc, d.last_date, d.event_date, d.category]
    .reduce((condition, key) => condition || key.toLowerCase().includes(lowerCaseKeyword), false)
  }
  render() {
    let eventList = this.state.data;
    let eventListDOM = eventList.length === 0 ? (<h1> Loading... </h1>) : eventList.filter(d => this.searchFilter(d)).map(e => (
      <Event id={e.title} key={e.title} data={e}/>
    ))
    return (
      <div>
        <h2> Event List </h2>
        <input type="text" className="form-control" placeholder="Search" onChange={e => this.searchHandler(e)} />
        {eventListDOM}
      </div>
    )
  }
}
