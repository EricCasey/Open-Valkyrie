import React, { Component } from "react";


class Foot extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let lay = this.props.layout
    return (
      <div className="Foot" style={{
        height: lay.foot ? '300px' : '36px',
        left: lay.left ? '300px' : '38px',
        width: lay.left ? 'calc(100% - 300px)' : 'calc(100% - 38px)'
      }}>
        <div id="hoverBox-Foot" onClick={this.props.layoutToggle}>^</div>
        <h2>STATS</h2>
      </div>
    );
  }
}

export default Foot;
