import './index.css';

import React, {Component} from 'react';



export default class Layout extends Component {
  render() {
    const size = {
      height: 500,
      width: 1000,
    };

    return (
      <svg
        {...size}
        viewBox={`0 0 ${ size.width } ${ size.height }`}
      />
    );
  }
}