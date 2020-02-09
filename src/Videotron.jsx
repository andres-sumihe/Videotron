import React, { Component } from 'react';
import Bg from './assets/BG1.png'
import Logo from './assets/PARTAI.png'
import Trivurat from './assets/trivurat.png'


export default class Videotron extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      style: ""
    }
  }

  render() {
    return (
      <div className="container"> 
          <div className="first-container">
            <div className="first">
              <div className="information-container">
                  <p></p>
              </div>
              <div className="controller">
                <button style={{width:40, margin:4}} onClick={()=> this.setState({open: true, style:"container-foto animated slide-in-elliptic-top-fwd"})}>In</button>
                <button style={{width:40}} onClick={()=> this.setState({style:"container-foto animated roll-out-bottom"})}>Out</button>
              </div>
            </div>
            <div className="second">
            {this.state.open? 

              <div className={this.state.style}>
                <div className="container-foto-img">
                  <img src="https://notagamer.net/wp-content/uploads/2020/01/image-316.png" alt="TEST" style={{width:'13vw', height:'18vw'}}/>
                </div>
              </div>
              
            :''}
            </div>
          </div>
          <div className="second-container">
              <div className="logo__partai">
                  <img src={Logo} alt="This is a logo" style={{width:300}}/>
              </div>
              <p>TITLE HERE</p>
              <div className="trivurat">
                  <img src={Trivurat} alt="This is a logo" style={{width:300}}/>
              </div>
          </div>
      </div>
    );
  }
}
