import './index.css';

import * as d3 from 'd3';
import React, {Component} from 'react';

import chart from '../chart';



/**
 * @constructor
 * @access public
 * @extends Component
 */
export default class Layout extends Component {
  /**
   * @function componentDidMount
   * @access protected
   */
  componentDidMount() {
    this.renderD3();
  }

  /**
   * @function componentDidUpdate
   * @access protected
   */
  componentDidUpdate() {
    this.renderD3();
  }

  /**
   * @function renderD3
   * @access protected
   */
  renderD3 = () => {
    this
      .selection
      .call(chart);
  }

  /**
   * @function render
   * @access protected
   *
   * @returns {Component}
   */
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