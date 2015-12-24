'use strict'

import React from 'react';
let { Component } = React;

export default class UserPage extends Component {
  constructor(p) {
    super(p);
  }
  render() {
    return (
      <div>
        <h1>Category</h1>
        <p>Stuff about it and event list of it</p>
      </div>
    );
  }
}
