import React, { Component } from 'react';
import io from 'socket.io-client';
import BG from './assets/BG1.png';
// import kue from 'kue'
const socket = io('http://pantimarhaen.id:7072', {transports: ['websocket']})
// const queqe = kue.createQueue()
const getBase64 = (file) => {
  return new Promise((resolve,reject) => {
     const reader = new FileReader();
     reader.onload = () => resolve(reader.result);
     reader.onerror = error => reject(error);
     reader.readAsDataURL(file);
  });
}
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
      activityID: '193592bd386f2a8acb195841cfd201a0',
      sessionID:'193592bd386f2a8acb195841cfd201a0',
      styleSetting: false,
      background:'./assets/BG1.png',
      photo: '',
      uri:'',
      nama:'NAMA',
      dataPhoto: [],
      data: [
        {"title":"a", "participants":"4", "precsences":"4"}
      ],
      temporary: [],
      name:[],
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // setInterval(this.gah(), 6000)
  }

  gah = async () => {
    console.log('gah')
    const {temporary,name} = this.state
    if(temporary.length>0){
      this.setState({open: true, style:"container-foto animated slide-in-elliptic-top-fwd"})
      this.setState({uri: temporary.shift(), nama: name.shift()})
      setTimeout(()=>{
      this.setState({style:"container-foto animated roll-out-bottom"})
      },6000)
      this.setState({temporary})
      this.setState({name})
      console.log(temporary.length)
    }

  }

  onReset = () => {
    localStorage["background"] = BG;
    const reset =  localStorage.getItem("background")
    this.setState({photo: `url(${reset})`})
  }
  componentDidMount = () => {
    
    // this.handleManyData()
    console.log("TEST", this.state.activityID, this.state.sessionID)
    socket.on("summary-"+this.state.activityID+"-"+this.state.sessionID, (res)=> {
        console.log("Hello",res)
        this.setState({data: res})
    })
    socket.on("checkin", (res) => {
        console.log("Check-in",res)
        const {temporary, name} = this.state
        temporary.push('http://kader.pantimarhaen.id:8001/cadres/'+res.photo)
        name.push(res.name)
        console.log(res.photo, res.name)
        console.log(this.state.uri)
        console.log(this.state.temporary)
        setInterval(
              ()=>this.gah()
              ,6000)
    })
    socket.on("connect", () => {
        console.log("Connection Success")
    })
    
  }

  componentWillUnmount() {
    socket.off();
   }

  //  trimScoket = (data) =>{
  //    const job = queqe.create('display', data)
  //    job.on('failed', err =>{
  //      console.log(err)
  //    })
  //    job.on('complete', result => {
  //      console.log(result)
  //    })
  //    job.save()
  //  }
  state = { selectedFile: null }
  imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      localStorage["background"] = base64;
      console.log("file stored",base64);
    });
  };
  changeImage = () => {
    const imageData =  localStorage.getItem("background")
    this.setState({photo: `url(${imageData})`})
  }
  handleSessionID = (event) => {
    this.setState({sessionID: event.target.value});
  }
  handleActivityID = (event) => {
    this.setState({activityID: event.target.value});
  }
  handleSubmit = (event)=> {

    alert('TEST' + this.state.activityID +  this.state.sessionID);
    event.preventDefault();
  }

  render() {
    
 
    return (
      <div className="container" style={{height: this.state.heightBackground+"vh", backgroundImage:this.state.photo }}> 
          <div className="first-container">
            <div className="first">
              <div className="information-container" style={{maxHeight: this.state.heightBackground+"vh" }}>
                <div className="big-title">
                  <h3 className="">KEHADIRAN</h3>
                </div>
                <div className="body-information">
                  {this.state.data.map((item)=>(
                      <div className="counter-container" key={item.id}>
                        <p className="title-counter" style={{fontSize: this.state.fontSizeHeader}}>{item.title}</p>
                        <p className="counter" style={{fontSize: this.state.fontSizeCounter}}>{item.precsences} / {item.participants} </p>
                      </div>
                  ))}
                </div>
              </div>
              {/* <div className="controller">
                <button style={{width:60, margin:4}} onClick={()=> this.setState({open: true, style:"animated slide-in-elliptic-top-fwd"})}>In</button>
                <button style={{width:60}} onClick={()=> this.setState({style:"animated roll-out-bottom"})}>Out</button>
              </div> */}
            </div>
            <div className="second" style={{height: this.state.heightBackground+"vh"}}>
            {this.state.open? 
            
            <div className={this.state.style} style={{textAlign:'center'}}>
              <div className="container-foto ">
                <div className="container-foto-img">
                  <img src={this.state.uri} alt="TEST" style={{width:'13vw', height:'18vw'}}/>
                </div>
              </div>
                  <p style={{fontSize:10, color:"white", bottom:-15}}>{this.state.nama}</p>
            </div>
              
            :''}
            </div>
            <div className="second">
            </div>
          </div>
          {this.state.styleSetting? 
              <div className="style-panel animated slide-in-right">
                <h2>SETTINGS</h2>
                  <div className="setting-container" style={{height:"20vh"}}>
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      sessionID:&nbsp;&nbsp;
                      <input type="text" value={this.state.sessionID} onChange={this.handleSessionID} />
                    </label>
                    <br />
                    <br />
                    <label>
                      activityID:&nbsp;&nbsp;
                      <input type="text" value={this.state.activityID} onChange={this.handleActivityID} />
                    </label>
                    <br />
                    <br />
                    <input type="submit" value="Submit" style={{float:'right'}} />
                  </form>
                  </div>
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
                  <div className="setting-container">
                        <input type="file" onChange={this.imageUpload} />
                        <button onClick={this.changeImage}>Upload!</button>
                        <button onClick={this.onReset}>Reset</button>
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
