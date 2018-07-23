import React, { Component } from "react";
//import axios from 'axios';

import Webcam from 'react-webcam';
import ReactPlayer from 'react-player';
import captureFrame from 'capture-frame';
import domtoimage from 'dom-to-image';
//import saveImage from 'save-image';
import base64Img from 'base64-img';

import { fs } from 'file-saver';

//import mapMatch from '../functions/mapMatch.js';

class Right extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: 'video',
      ping: '',
      pingMap: false,
      tracking: false,
      mapMatch: {},
      shiftMap: { marginLeft: -742, marginTop: -8 },
      shiftCounter: { marginLeft: -1010, marginTop: -220 },
      snap: {
        map: true,
        counter: true,
        compass: false,
        weapons: false,
        health: false
      }
    }
    this.methClick = this.methClick.bind(this);
    this.imageClick = this.imageClick.bind(this);
    this.snapshot = this.snapshot.bind(this);
    this.toggleTracking = this.toggleTracking.bind(this);
    this.shiftImg = this.shiftImg.bind(this);
    this.snapSwitch = this.snapSwitch.bind(this);

    this.webcam = Webcam;
    this.base64Img = base64Img
  }

  methClick(e) {
    this.setState({ source: e.target.id })
  }

  imageClick(e) {
    //console.log('ImageClick()')
    // POST -> localhost:9900/opencv/matchtemplate
    //*[@id="video-playback"]/div[1]/video
  }

  snapshot() {
    const buf = captureFrame('#local-player video')
    const image = document.createElement('img')
    image.src = window.URL.createObjectURL(new window.Blob([buf]))
    //document.body.appendChild(image)
    this.setState({ ping: image });

    // -- Map Payload Image
    var node = document.getElementById('map');
    var scope = this
    domtoimage
    .toBlob(node, { height: 130, width: 130 })    
    .then(function (blob) {
      scope.setState({ pingMap: blob })
      scope.props.mapMatch(blob);
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });  


    // -- Counter Payload Image
    
    // .toJpeg(node, { quality: 0.95, height: 130, width: 130 })
    // .then(function (dataUrl) {
    //     var link = document.createElement('a');
    //     //link.download = 'input.jpeg';
    //     link.href = dataUrl;
    //     scope.setState({ pingMap: dataUrl })
    //     scope.props.mapMatch(dataUrl);
    // });

  }

  toggleTracking() {
    //console.log("toggleTracking()")
    this.setState({ tracking: this.state.tracking ? false : true });
    var tracking = this.state.tracking ? true : false
    if(this.state.tracking) {
      //console.log("clearing interval")
      clearInterval();
    } else {
      const scope = this;
      setInterval(function() { 
        //console.log("screenshot")
        if(!scope.tracking) {
          scope.snapshot();
        }
      }, 10000);
    }
  }

  shiftImg(e) {
    //console.log(e.target.id);
    var shiftMap = this.state.shiftMap
    var shiftCounter = this.state.shiftCounter
    if(e.target.className === "mapShift") {
      if(e.target.id === "cont-left") {
        shiftMap.marginLeft -= 2
      } else if(e.target.id === "cont-right") {
        shiftMap.marginLeft += 2
      } else if(e.target.id === "cont-up") {
        shiftMap.marginTop -= 2
      } else if(e.target.id === "cont-down") {
        shiftMap.marginTop += 2
      }
    } else if (e.target.className === "counterShift") {
      if(e.target.id === "cont-left") {
        shiftCounter.marginLeft -= 2
      } else if(e.target.id === "cont-right") {
        shiftCounter.marginLeft += 2
      } else if(e.target.id === "cont-up") {
        shiftCounter.marginTop -= 2
      } else if(e.target.id === "cont-down") {
        shiftCounter.marginTop += 2
      }
    }


    this.setState({ shiftMap, shiftCounter })
  }

  snapSwitch(e) {
    console.log(e.target.className.split(" ")[1]);
    var toggled = e.target.className.split(" ")[1]
    var snap = this.state.snap
    console.log(snap)
    if(toggled === "map") {
      snap.map = snap.map ? false : true
    } else if(toggled === "counter") {
      snap.counter = snap.counter ? false : true
    } else if(toggled === "compass") {
      snap.compass = snap.compass ? false : true
    } else if(toggled === "weapons") {
      snap.weapons = snap.weapons ? false : true
    } else if(toggled === "health") {
      snap.health = snap.health ? false : true
    } 
    console.log(snap)
    this.setState({ snap })
  }

  render() {

    //console.log(this.state.pingMap)
    //console.log(this.props.mapMatchVal)
    let lay = this.props.layout;
    let preview = <div className="viewBox">default</div>
    if(this.state.source === "video") {
      preview = <div className="viewBox">

                  <ReactPlayer id="local-player" url={require("../vid/sample3.mp4")} width={383} height={220} playing loop/>

                  <div id="vid-controls">
                  <div id="vid-snap" onClick={this.snapshot}>SNAPSHOT</div>
                  <div id="vid-track" onClick={this.toggleTracking}>{this.state.tracking ? "STOP" : "START TRACKING"}</div>
                  </div>
                  
                </div>
    } else if (this.state.source === "image") {
      preview = <div className="viewBox">
                  <input id="img-input" type="file" name="pic" accept="image/*" />
                  <img 
                    src={require('../img/default-img.jpg')}  
                    id="default-img"
                    alt="logo" 
                    onClick={this.imageClick()} />
                </div>
    } else if (this.state.source === "webcam") {
      preview = <div className="viewBox">
                  <div id="vid-overlay">
                    <div id="trCont">
                      <div id="vid-map"></div>
                      <div id="vid-kills"></div>
                    </div>
                  </div>

                  <Webcam 
                  width={380} 
                  height={218}
                  audio={false}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                   />
                  
                </div>
    }
    return (
      <div className="Right" style={{
        width: lay.right ? '500px' : '36px',
        height: lay.foot ? 'calc(100% - 500px)' : 'calc(100% - 36px)'
    }}>

        <div id="hoverBox-Right" onClick={this.props.layoutToggle}>{`<`}</div>

        <h2 style={{
              transform: lay.right ? 'rotate(0deg)' : 'rotate(270deg)',
              margin: lay.right ? '0 0 0 0' : '110px 0 0 -10px',
              width: lay.right ? '500px' : '1000px'
            }}>
            INPUT
        </h2>

        <div id="source" style={{ opacity: lay.right ? 1 : 0 }}>
          <h4>SOURCE</h4>
          <div id="method">
              <div className="methodO" id="twitch" onClick={this.methClick}>
                <img className="methImg" id="twitch" alt="img" src="http://www.freelogovectors.net/wp-content/uploads/2016/12/twitch-logo1.png" />
              </div>
              <div className="methodO" id="webcam" onClick={this.methClick}>
                <img className="methImg" id="webcam" alt="img" src="https://www.panasonic.com/content/dam/pim/in/en/HC/HC-PV1/HC-PV100GW/HC-PV100GW-Variation_Image_for_See_All_1Global-1_in_en.png" />
              </div>
              <div className="methodO" id="image" onClick={this.methClick}>
                <img className="methImg" id="image" alt="img" src="https://www.cliftoncameras.co.uk/uploads/products/PanasonicDMCFZ2000Front.png" />
              </div>
          </div>
          <div id="preview">
            {preview}
          </div>
        </div>

        <div id="img-data" style={{ opacity: lay.right ? 1 : 0 }}>

          <div id="imageBox">

          <div className={`snapA ${this.state.snap.map ? 'activeSnap' : 'inactiveSnap'}`}>
          <div className="switch map" onClick={this.snapSwitch}>
          ON/OFF
          </div>
          <h4>MAP</h4>
          <div className="sampleImg" id="map">
              <img className="shiftImg" style={{
                marginLeft: this.state.shiftMap.marginLeft,
                marginTop: this.state.shiftMap.marginTop
              }} src={this.state.ping.src} alt="map"  />
            </div>
            <div className="controls">
              <div id="cont-up" className="mapShift" onClick={this.shiftImg}>
                <i className="fas fa-angle-up" aria-hidden="false"></i>
              </div>
              <div id="cont-left" className="mapShift" onClick={this.shiftImg}>
              <i className="fas fa-angle-left" aria-hidden="false"></i>
              </div>
              <div id="cont-right" className="mapShift" onClick={this.shiftImg}>
              <i className="fas fa-angle-right" aria-hidden="false"></i>
              </div>
              <div id="cont-down" className="mapShift" onClick={this.shiftImg}>
              <i className="fas fa-angle-down" aria-hidden="false"></i>
              </div>
            </div>
          </div>

          <div className={`snapA ${this.state.snap.counter ? 'activeSnap' : 'inactiveSnap'}`}>
          <div className="switch counter" onClick={this.snapSwitch}>
          ON/OFF
          </div>
          <h4>COUNTERS</h4>
          <div className="sampleImg" id="counter">
             <img className="shiftImg" style={{
                marginLeft: this.state.shiftCounter.marginLeft,
                marginTop: this.state.shiftCounter.marginTop
              }} src={this.state.ping.src} alt="map"  />
            </div>
            <div className="controls">
              <div id="cont-up" className="counterShift" onClick={this.shiftImg}>
                <i className="fas fa-angle-up" aria-hidden="false"></i>
              </div>
              <div id="cont-left" className="counterShift" onClick={this.shiftImg}>
              <i className="fas fa-angle-left" aria-hidden="false"></i>
              </div>
              <div id="cont-right" className="counterShift" onClick={this.shiftImg}>
              <i className="fas fa-angle-right" aria-hidden="false"></i>
              </div>
              <div id="cont-down" className="counterShift" onClick={this.shiftImg}>
              <i className="fas fa-angle-down" aria-hidden="false"></i>
              </div>
            </div>
          </div>

          <div className={`snapA ${this.state.snap.compass ? 'activeSnap' : 'inactiveSnap'}`}>
          <div className="switch compass" onClick={this.snapSwitch}>
          ON/OFF
          </div>
          <h4>COMPASS / BEARING</h4>
          <div className="sampleImg" id="compass">
              <img className="shiftImg" src={this.state.ping.src} alt="map"  />
            </div>
          </div>

          <div className={`snapA ${this.state.snap.weapons ? 'activeSnap' : 'inactiveSnap'}`}>
          <div className="switch weapons" onClick={this.snapSwitch}>
          ON/OFF
          </div>
          <h4>WEAPONS</h4>
          <div className="sampleImg" id="weapons">
              <img className="shiftImg" src={this.state.ping.src} alt="map"  />
            </div>
          </div>

          <div className={`snapA ${this.state.snap.health ? 'activeSnap' : 'inactiveSnap'}`}>
          <div className="switch health" onClick={this.snapSwitch}>
          ON/OFF
          </div>
          <h4>HEALTH</h4>
          <div className="sampleImg" id="health">
              <img className="shiftImg" src={this.state.ping.src} alt="map"  />
            </div>
          </div>

          </div>
        </div>

      </div>
    );
  }
}

export default Right;
