import React, { Component } from "react";

// Containers
import Left from './components/Left.js';
import Right from './components/Right.js';
import Foot from './components/Foot.js';
import Action from './components/Action.js';
import Head from './components/Head.js';

import mapMatch from './functions/mapMatch.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapMatchVal: [0,0,0,0,0],
      points: [ [0,0,0,0,0] ],
      layout: {
        left: false,
        right: true,
        foot: false,
        head: false
      }
    }
    this.layoutToggle = this.layoutToggle.bind(this);
    this.mapMatch = mapMatch.bind(this);
    this.plotPoints = this.plotPoints.bind(this);
    this.plotPoint = this.plotPoint.bind(this);
  }

  componentWillUpdate() {
    this.plotPoint();
  }

  layoutToggle(e) {
    var layout = this.state.layout
    if(e.target.id.split("-")[1] === "Left") {
      layout = layout.left ? { left: false, right: false, foot: false, head: false } : { left: true, right: false, foot: false, head: false } 
    } else if (e.target.id.split("-")[1] === "Right") {
      layout = layout.right ? { left: false, right: false, foot: false, head: false } : { left: false, right: true, foot: false, head: false } 
    } else if (e.target.id.split("-")[1] === "Foot") {
      layout = layout.foot ? { left: false, right: false, foot: false, head: false } : { left: false, right: false, foot: true, head: false } 
    } else if (e.target.id.split("-")[1] === "Head") {
      layout = layout.head ? { left: false, right: false, foot: false, head: false } : { left: false, right: false, foot: false, head: true } 
    }
    this.setState({ layout });
  }

  plotPoints() {
    console.log("plotting all points")
    var c = document.getElementById('pointCanvas');
    var ctx = c.getContext("2d");
        this.state.points.map((point,x) => {
          if(point.reduce((a, b) => a + b) !== 0) {
            ctx.beginPath();
            ctx.lineWidth=3;
            ctx.strokeStyle = '#'+'0123456789abcdef'.split('').map(function(v,i,a){
              return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
            ctx.arc((point[1]*(800/1030))+100,(point[2]*(800/1030))+100,50,0,2*Math.PI);
            ctx.stroke();
          }
        })
  }

  plotPoint() {
    console.log("plotting last point")
    var c = document.getElementById('pointCanvas');
    var ctx = c.getContext("2d");
    var lastPoint = this.state.points[this.state.points.length - 2]
    var thisPoint = this.state.points[this.state.points.length - 1]
          if(lastPoint.reduce((a, b) => a + b) !== 0) {
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle = '#FF0000'
            // -- RANDOM COLOR
              // '#'+'0123456789abcdef'.split('').map(function(v,i,a){
              // return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');

              // -- CIRCLE
            // ctx.arc((thisPoint[1]*(800/1030))+50,(thisPoint[2]*(800/1030))+50,50,0,2*Math.PI);
            // ctx.arc((thisPoint[1]*(800/1030))+50,(thisPoint[2]*(800/1030))+50,25,0,2*Math.PI);

            // -- LINES
            ctx.moveTo((lastPoint[1]*(800/1030))+50, (lastPoint[2]*(800/1030))+50);
            ctx.lineTo((thisPoint[1]*(800/1030))+50, (thisPoint[2]*(800/1030))+50);


            ctx.stroke();
          }

  }

  render() {
    // console.log(this.state.layout)
    // console.log(this.state.mapMatchVal)
    // console.log(this.state.points)
    return (
      <div className="App">

        <Head layoutToggle={this.layoutToggle} layout={this.state.layout} />
        <Left layoutToggle={this.layoutToggle} layout={this.state.layout} />
        <Right layoutToggle={this.layoutToggle} layout={this.state.layout} mapMatch={this.mapMatch}  />
        <Foot layoutToggle={this.layoutToggle} layout={this.state.layout} />
        <Action layout={this.state.layout} mapMatchVal={this.state.mapMatchVal} points={this.state.points}/>

      </div>
    );
  }
}

export default App;
