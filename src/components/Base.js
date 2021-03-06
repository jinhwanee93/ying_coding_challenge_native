import React, { Component } from 'react';


// Algorithm to AUTOBIND functions in React, opted out of using the transform plugin for this
export default class Base extends Component {
  autoBind(...methods) {
    methods.forEach(method => this[method] = this[method].bind(this));
  }
}