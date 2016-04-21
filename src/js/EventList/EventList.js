'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router';

let bgColors = {
  "music": "rgb(198, 189, 212)",
  "art": "#BDD4D4"
};

let headColors = {
  "music": "transparent linear-gradient(#6F5499, #8E7DAA) repeat scroll 0% 0%",
  "art": "transparent linear-gradient(#32A1BF, #609FFF) repeat scroll 0% 0%"
};

class Event extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      cardWrap: {
        padding: '0px',
        backgroundColor: bgColors[props.data.category]
      },
      wrapHead: {
        textAlign: 'center',
        padding: '10px 0px',
        margin: '0px',
        color: '#FFF',
        background: headColors[props.data.category]
      },
      eventTime: {
        textAlign: 'center',
        whiteSpace: 'pre'
      },
      paraPad: {
        padding: '5px 20px'
      }
    };
  }

  render() {
    return (
      <div style={this.styles.cardWrap} className="col-md-6">
        <h3 style={this.styles.wrapHead}>{this.props.data.title} <small><Link to={`/category/${this.props.data.category}`}>{this.props.data.category}</Link></small></h3>
        <div className="row">
          <div style={this.styles.eventTime} className="col-md-6"><i className="fa fa-calendar-times-o"></i>  {this.props.data.last_date}</div>
          <div style={this.styles.eventTime} className="col-md-6"><i className="fa fa-calendar"></i>  {this.props.data.event_date}</div>
        </div>
        <p style={this.styles.paraPad}>{this.props.data.desc}</p>
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
    $.getJSON('/nsit-fest/json/events.json', d => this.setState({data: d.events}));
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
