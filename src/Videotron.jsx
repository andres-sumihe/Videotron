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
      uri:'http://kader.pantimarhaen.id:8001/cadres/default.jpg',
      nama:'NAMA SAYA ADALAH SUPERMAN YANG HEBAT',
      dataPhoto: [],
      data: [
        {"title":"Title", "participants":"1", "precsences":"192"}
      ],
      temporary: [],
      name:[],
      hide: true,
      
    }
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
    this.changeImage()
    socket.on("summary-"+this.state.activityID+"-"+this.state.sessionID, (res)=> {
        console.log("Hello",res)
        this.setState({data: res})
    })
    socket.on("checkin", (res) => {
        console.log("Check-in",res)
        const {temporary, name} = this.state
        temporary.push('http://kader.pantimarhaen.id:8001/cadres/'+ (res.photo === null || res.photo === "" ? 'default.jpg':res.photo) )
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
    const {activityID, sessionID} = this.state;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEYXRhR2VuZXJhbHMiLCJzdWIiOiJwZDFkNzA5OWIxNTNlMGQwNjQ3Njc0ODBkZjc1NjgwMCIsImlhdCI6MTU4MTcwMjQ3OCwiZXhwIjoxNTgxNzA0NDAyLCJ1c2VyIjp7InVzZXJJRCI6InBkMWQ3MDk5YjE1M2UwZDA2NDc2NzQ4MGRmNzU2ODAwIiwib2ZmaWNlSUQiOm51bGwsImNhZHJlSUQiOm51bGwsIm5hbWUiOiJQYW5pdGlhIDEiLCJwaG90byI6bnVsbCwic2VjcmV0IjoiJDJ5JDEwJEZPWnJ3S3RNbFVCZFd3YnhpdGRncmVFdTJvdzY1M3dcLzE4VE5SbXN1czZ3ZXVxdzlBQllsVyIsImxldmVsIjoiT3BlcmF0b3IifSwic2VjcmV0IjoiZDc0NWNjYjQ1ZTA1OTBhMmZlYWRhOGMxY2MyNDRjNDcifQ.dwYHkExAiRpRZKP7F6M4plv7ryxyOmKMBg41HM6Tztw");

    var raw = `body={"activityID":"${activityID}","sessionID":"${sessionID}"}`
    // var raw = `body={"activityID":"193592bd386f2a8acb195841cfd201a0","sessionID":"193592bd386f2a8acb195841cfd201a0"}`
    // var raw = JSON.stringify({"activityID":"193592bd386f2a8acb195841cfd201a0","sessionID":"193592bd386f2a8acb195841cfd201a0"});

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      // param: 
      // body: raw,
      redirect: 'follow'
    };

    fetch("http://events.pantimarhaen.id:8001/presences/summary?"+raw, requestOptions)
      .then(response => response.text())
      .then(result => {
        const temp = JSON.parse(result)
        console.log(temp.data.summary)
        this.setState({data: temp.data.summary})
      })
        // console.log(result))
      // .then(result => console.log(result))
      .catch(error => console.log('error', error));

      console.log(this.state.data)
      
    // const url = "http://events.pantimarhaen.id:8001/presences/summary" 
    // fetch(url).then((res)=> res.json())
    //     .then((resJson)=>{  
    //       console.log(resJson)
    //     }).catch(err => {
    //       console.log(err)
    //     })
    //https://events.pantimarhaen.id:8001/presences
    event.preventDefault();
  }

  render() {
    return (
      <div className="container" style={{height: this.state.heightBackground+"vh" }}> 
          {/* <img src={BG} alt="" style={{position:'absolute',top:0, left:0, width:"100vw", height: this.state.heightBackground+"vh"}}/> */}
          <div className="first-container">
            <div className="first">

              {this.state.hide ? 
                <div className="information-container" style={{maxHeight: this.state.heightBackground+"vh" }}>
                  <div className="big-title">
                    <h3 className="">KEHADIRAN</h3>
                  </div>
                  <div className="body-information">
                    {this.state.data.map((item,i)=>(
                        <div className="counter-container" key={i}>
                          <p className="title-counter" style={{fontSize: this.state.fontSizeHeader}}>{item.title}</p>
                          <p className="counter" style={{fontSize: this.state.fontSizeCounter}}>{item.precsences} / {item.participants} </p>
                        </div>
                    ))}
                  </div>
                </div>
              :''}
              <div className="controller">
                <button style={{width:60, margin:4}} onClick={()=> this.setState({open: true, style:"animated slide-in-elliptic-top-fwd"})}>In</button>
                <button style={{width:60}} onClick={()=> this.setState({style:"animated roll-out-bottom"})}>Out</button>
              </div>
            </div>
            <div className="second" style={{height: this.state.heightBackground+"vh"}}>
            
            </div>
            <div className="second" style={{height: this.state.heightBackground+"vh"}}>
                {this.state.open? 
                
                <div className={this.state.style} style={{alignItems:'center',textAlign:'center', width:'100%', display:"flex", justifyContent:'center', flexDirection:'column'}}>
                  <div className="container-foto ">
                    <div className="container-foto-img">
                      <img src={this.state.uri} alt="TEST" style={{width:'13vw', height:'18vw'}}/>
                    </div>
                  </div>
                      <p style={{fontSize:12, color:"white", bottom:-15}}>{this.state.nama}</p>
                </div>
                  
                :''}
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
                    <button onClick={()=> this.setState({hide: !this.state.hide})}>{this.state.hide ? 'Sembunyikan Panel Kehadiran': 'Tampilkan Panel Kehadiran'}</button>
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
