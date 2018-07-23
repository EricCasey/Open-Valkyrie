import React, { Component } from "react";

class MarginControl extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="MarginControl">
        <div id="cont-left">LEFT</div>
        <div id="cont-right">RIGHT</div>
        <div id="cont-up">UP</div>
        <div id="cont-down">DOWN</div>
      </div>
    );
  }
}

export default MarginControl;
