import React, { Component } from 'react';
import './Gift.css';

class Gift extends Component {

  render() {
    return (
      <div className="Gift">
        {this.props.name}
        <button className="remove" onClick={this.props.remove}>X</button>
      </div>
    );
  }
}

export default Gift;
