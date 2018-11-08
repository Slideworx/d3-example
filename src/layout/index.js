import './index.css';

import * as d3 from 'd3';
import React, {Component} from 'react';

import chart from '../chart';
import data from '../data';



export default class Layout extends Component {
  componentDidMount() {
    this.renderD3();
  }

  componentDidUpdate() {
    this.renderD3();
  }

  renderD3 = () => {
    this
      .selection
      .call(
        chart,
        () => [data]
      );
  }

  render() {
    const size = {
      height: 500,
      width: 1000,
    };

    return (
      <svg
        {...size}
        ref={
          (ref) => {
            this.selection = d3.select(ref);
          }
        }
        viewBox={`0 0 ${ size.width } ${ size.height }`}
      />
    );
  }
}