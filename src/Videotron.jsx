import React, { Component } from 'react';
import Logo from './assets/PARTAI.png'
import Trivurat from './assets/trivurat.png'


export default class Videotron extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      style: "",
      count: 0,
      fontSizeHeader: 12,
      fontSizeCounter: 22,
      heightBackground: 80,
      styleSetting: false,
      data: [
        {
          "title" :'Calon Bupati',
          "total" :'132',
          "hadir" :'12'
        },
        {
          "title" :'Calon Walikota',
          "total" :'153',
          "hadir" :'23'
        },
        {
          "title" :'Calon Istri',
          "total" :'100',
          "hadir" :'0'
        },
        {
          "title" :'Calon Raja Sunda Empayer',
          "total" :'321',
          "hadir" :'23'
        },
        {
          "title" :'Calon Calonan',
          "total" :'721',
          "hadir" :'21'
        },
        {
          "title" :'Calon Presiden MieMiekarta',
          "total" :'238',
          "hadir" :'212'
        },
      ]
    }
  }

  render() {
    return (
      <div className="container" style={{height: this.state.heightBackground+"vh" }}> 
          <div className="first-container">
            <div className="first">
              <div className="information-container" style={{maxHeight: this.state.heightBackground+"vh" }}>
                <div className="big-title">
                  <h3 className="">KEHADIRAN</h3>
                </div>
                <div className="body-information">
                  {this.state.data.map(item=>(
                      <div className="counter-container" key={item.id}>
                        <p className="title-counter" style={{fontSize: this.state.fontSizeHeader}}>{item.title}</p>
                        <p className="counter" style={{fontSize: this.state.fontSizeCounter}}>{item.hadir} / {item.total}</p>
                      </div>
                  ))}
                </div>
              </div>
              <div className="controller">
                <button style={{width:60, margin:4}} onClick={()=> this.setState({open: true, style:"container-foto animated slide-in-elliptic-top-fwd"})}>In</button>
                <button style={{width:60}} onClick={()=> this.setState({style:"container-foto animated roll-out-bottom"})}>Out</button>
              </div>
            </div>
            <div className="second" style={{height: this.state.heightBackground+"vh"}}>
            {this.state.open? 

              <div className={this.state.style}>
                <div className="container-foto-img">
                  <img src="https://notagamer.net/wp-content/uploads/2020/01/image-316.png" alt="TEST" style={{width:'13vw', height:'18vw'}}/>
                </div>
              </div>
              
            :''}
            </div>
          </div>
          <div className="second-container" style={{height: this.state.heightBackground+"vh"}}>
              <div className="logo__partai">
                  <img src={Logo} alt="This is a logo" style={{width:300}}/>
              </div>
              <div className="trivurat">
                  <img src={Trivurat} alt="This is a logo" style={{width:300}}/>
              </div>
          </div>
          {this.state.styleSetting? 
              <div className="style-panel animated slide-in-right">
                <h2>SETTINGS</h2>
                  <div className="setting-container">
                    <p>FontSize Header</p>
                    <button onClick={()=> this.setState({fontSizeHeader: this.state.fontSizeHeader-1})}>-</button>
                      <p>{this.state.fontSizeHeader}</p>
                    <button onClick={()=> this.setState({fontSizeHeader: this.state.fontSizeHeader+1})}>+</button>
                  </div>
                  <div className="setting-container">
                    <p>FontSize Counter</p>
                    <button onClick={()=> this.setState({fontSizeCounter: this.state.fontSizeCounter-1})}>-</button>
                      <p>{this.state.fontSizeCounter}</p>
                    <button onClick={()=> this.setState({fontSizeCounter: this.state.fontSizeCounter+1})}>+</button>
                  </div>
                  <div className="setting-container">
                    <p>height Background</p>
                    <button onClick={()=> this.setState({heightBackground: this.state.heightBackground-1})}>-</button>
                      <p>{this.state.heightBackground}vh</p>
                    <button onClick={()=> this.setState({heightBackground: this.state.heightBackground+1})}>+</button>
                  </div>
              </div>
          :''}
          <div className="style-button">
              <a href="#" onClick={()=>this.setState({styleSetting: !this.state.styleSetting})}>
                <i className="icon-settings"></i>
              </a>
          </div>
      </div>
    );
  }
}
