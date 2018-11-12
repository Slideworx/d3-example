import './index.css';

import * as d3 from 'd3';
import React, {Component} from 'react';

import chart from '../chart';
import data from '../data';



/**
 * @constructor
 * @access public
 * @extends Component
 */
export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column: null,
      row: null,
    };
  }

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
   * @function onColumnClick
   * @access protected
   *
   * @param {string} id
   */
  onColumnClick = (id) => {
    const {
      column,
    } = this.state;

    this.setState(
      {
        column: id === column ? null : id,
        row: null,
      }
    );
  }

  /**
   * @function onRowClick
   * @access protected
   *
   * @param {string} id
   */
  onRowClick = (id) => {
    const {
      row,
    } = this.state;

    this.setState(
      {
        column: null,
        row: id === row ? null : id,
      }
    );
  }

  /**
   * @function renderD3
   * @access protected
   */
  renderD3 = () => {
    this
      .selection
      .call(
        chart,
        () => [data],
        {
          onClick: {
            column: this.onColumnClick,
            row: this.onRowClick,
          },
          selected: this.state,
        }
      );
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