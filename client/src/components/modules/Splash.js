import React, { Component } from "react";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let lay = this.props.layout;
    return (
      <div className="Splash">
      <div id="hero">
      <div id="logoDiv">
        <img src={require('../../img/logo/react.svg')}  id="spin-logo" alt="logo" />
        <img src={require('../../img/Sleipnir.png')} alt="horse" id="hoverBox-Head" className="horse" onClick={this.props.layoutToggle} />
        <img src={require('../../img/logo/redux.svg')}  id="spin-logo" alt="logo" />
      </div>

        <h1>
          Trick Pony Tools
        </h1>
        <h2>
          Homepage & Open Express-React-Redux Web App Boilerplate
        </h2>

        <h4>
          A Node, Express, React, Redux, D3, Plotly, R, Boilerplate Project
        </h4>
      </div>

        <div className="infoDiv"> 
          <p>
            React, Redux, SASS, D3, 
          </p>
          <img src="" alt=""/>
        </div>
        <div className="contentBox">
          <pre>

            URL: https://github.com/EricCasey/Trick-Pony-Boilerplate
            <br/>
            git clone https://github.com/EricCasey/Trick-Pony-Boilerplate my-project
            <br/>
            cd my-project
            <br/>
            npm i
            <br/>
            cd client
            <br/>
            npm i
            <br/>
            cd ..
            <br/>
            npm start
            <br/>


          </pre>
        </div>
      </div>
    );
  }
}

export default Splash;
