/* eslint-disable no-unused-vars */
import React from "react";

import Button from "react-bootstrap/Button";
import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link} from "react-router-dom";
import socketIOClient from "socket.io-client";

let socket = socketIOClient("localhost:4001");
class RoomPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList: [],
      createRoom: false,
      NumberRoom: 0,
      randomLink: '/play/room0',
    };
    this.handleCreateRoom = this.handleCreateRoom.bind(this);

  }
  
  componentWillMount(props){   
    //send request to get list of room 1 player
    let req = {
      header: "number-of-room"
    }
    socket.emit("number-of-room", req);
    socket.on("number-of-room-from-server", res => {
      // console.log(Object.keys(res).length);
      this.setState({NumberRoom: Object.keys(res).length});
    })
  }

  handleCreateRoom(){
    let req = {
      header: "create-room"
    }
    socket.emit("create-room", req);
    socket.on("create-room-from-server", res => {
      // console.log(res);
      console.log("number of room state: "+ this.state.NumberRoom);
      this.setState({NumberRoom: res.roomNumber, createRoom: true})
    })
  }

  render() {
    let roomList = [];
    for (let i = 0; i < this.state.NumberRoom; i++) {
      let link = "/play/room"+i;
      roomList.push(
        <Link to={link} key={i}>
          <Button className="room-btn" size="lg" variant="outline-info"  >
            Room#{i<10?'0'+i:i}
          </Button>
        </Link>
      );
    }

    let rand = Math.floor(Math.random() * this.state.NumberRoom );//0 .. 99
    let link = "/play/room" + rand.toString();
    console.log( "rd link: "+ link);

    let rdBtn = ( 
      <Link to={link} >
        <Button variant="primary" className="create-btn" >
          Random Game
        </Button>
      </Link>
    )
    
    return (
      <div>
        <div className="line-left">
          <Button variant="outline-primary" className="create-btn" onClick={this.handleCreateRoom}>
            Create Room
          </Button>

          {rdBtn}
          
        </div>
        <div className="wrapper-room-btn">
          {roomList}

        </div>
      </div>
    );
  }
}

export default RoomPicker;