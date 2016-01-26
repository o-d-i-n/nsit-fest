'use strict'

import React, { Component } from 'react';

export default class UserPage extends Component {
  constructor(p) {
    super(p);
    this.state = {data: []};
    $.getJSON('/json/events.json', d => this.setState({data: d.categories}));
  }
  render() {
    let cats = Object.keys(this.state.data).map(e => <li key={e}>{e.toUpperCase()}</li>);
    return (
      <div>
        <h1>Categories</h1>
        {cats}
      </div>
    );
  }
}
