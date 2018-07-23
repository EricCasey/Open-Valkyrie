import React, { Component } from "react";

class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapAngle: 0,
      mapZoom: 800,
      mapMatch: {}
    }
    this.zoomClick = this.zoomClick.bind(this);
    this.angleChange = this.angleChange.bind(this);
  }

  angleChange(e) {
    //console.log(e.target.value);
    this.setState({ mapAngle: e.target.value })
  }

  zoomClick(e) {
    var mapZoom = this.state.mapZoom
    if(e.target.id === "zoom-in") {
      mapZoom += 75
    } else if(e.target.id === "zoom-out")  {
      mapZoom -= 75
    }
    this.setState({ mapZoom });
  }

  render() {
    let lay = this.props.layout;
    let grid = {
      x: ['A','B','C','D','E','F','G','H','I','J'],
      y: [1,2,3,4,5,6,7,8,9,10]
    }

    //console.log(this.props);
    //console.log(this.props.mapMatchVal);

    return (
      <div className="Action" style={{
        left: lay.left ? '300px' : '38px',
        width: lay.left ? 'calc(100% - 338px)' : lay.right ? 'calc(100% - 538px)' : 'calc(100% - 76px)',
        height: lay.foot ? 'calc(100% - 338px)' : 'calc(100% - 74px)',
        top: lay.head ? '300px' : '38px'
      }}>

        <div id="zoom">
          <div className="zoomBtn" id="zoom-in" onClick={this.zoomClick}>
            <i className="fas fa-search-plus zoomI"></i>
          </div>
          <div id="zoom-scale"></div>
          <div className="zoomBtn" id="zoom-out" onClick={this.zoomClick}>
            <i className="fas fa-search-minus zoomI"></i>
          </div>
        </div>

        <div id="compass">
          <div id="drag">
          <input type="range" id="drag-angle" name="angle" min="0" max="360" onChange={this.angleChange} />
          </div>
          <img 
            src={require('../img/compass.gif')}  
            id="compass-img" 
            alt="logo"
            style={{
              transform: `rotate(${this.state.mapAngle}deg)`
            }} />
        </div>

        <div id="storm">
            <div id="edge"></div>
        </div>

        

         <div id="x-axis">
            <div className="x-axis-context" style={{ width: this.state.mapZoom }}>
            {grid.x.map((x,i) => {
                  return <div key={x} className="x-ax"><p>{x}</p></div>
                })}</div>
 
          </div>
          <div id="y-axis">
          <div className="x-axis-context" style={{ height: this.state.mapZoom }}>
          {grid.y.map((y,i) => {
                  return <div key={y} className="y-ax"><p>{y}</p></div>
                })}
                </div>
          
          </div>

        <div id="mapC" style={{ 
                          height: this.state.mapZoom, 
                          width: this.state.mapZoom, 
                          marginLeft: `-${this.state.mapZoom/2}px`,
                          marginTop: `-${this.state.mapZoom/2}px`,
                          transform: `rotate(${this.state.mapAngle}deg)` 
                          }}>
            <div id="grid">

                {grid.y.map((y,i) => {
                  return grid.x.map((x,i) => {
                    return <div key={x+y} className="gridBox"><p>{x}{y}</p></div>
                  })
                })}

            </div>

            <div id="location">
                <canvas id="pointCanvas" height={`${this.state.mapZoom}px`} width={`${this.state.mapZoom}px`}></canvas>
            </div>


                <img 
                  src={require('../img/fortnitemap-s5-3.png')}
                  id="map-template"
                  alt="logo" />

        </div>
        
      </div>
    );
  }
}

export default Action;
