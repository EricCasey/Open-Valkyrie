import React, { Component } from "react";


class Left extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let lay = this.props.layout;
    return (
      <div className="Left" style={{
          width: lay.left ? '300px' : '36px',
          height: 'calc(100% - 36px)',
          top: lay.head ? '300px' : '38px'
      }}>
        <div id="hoverBox-Left" onClick={this.props.layoutToggle}>></div>
        <div id="leftCont" style={{
              width: lay.left ? '100%' : '0%'
            }}>
          <h2 style={{
              transform: lay.left ? 'rotate(0deg)' : 'rotate(90deg)',
              margin: lay.left ? '0 0 0 0' : '60px 0 0 -143px'
            }}>CHALLENGES</h2>
          <div id="leftList" style={{
              opacity: lay.left ? 1 : 0
            }}>
            <div className="leftO"> option 1 </div>
            <div className="leftO"> option 2 </div>
            <div className="leftO"> option 4 </div>
            <div className="leftO"> option 1 </div>
            <div className="leftO"> option 2 </div>
            <div className="leftO"> option 4 </div>
            <div className="leftO"> option 1 </div>
            <div className="leftO"> option 2 </div>
            <div className="leftO"> option 4 </div>
            <div className="leftO"> option 1 </div>
            <div className="leftO"> option 2 </div>
            <div className="leftO"> option 4 </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Left;
