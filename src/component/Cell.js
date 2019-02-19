import React from "react";
import SocketContext from "../socket-context";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.id,
      in: "",
      x: this.props.x,
      y: this.props.y,
      isMyTurn: this.props.value.isMyTurn,
      isX: this.props.isX,
      oppID:this.props.oppID,
      room:this.props.room
    };
    this.handleClick = this.handleClick.bind(this);
  }

  getValueInCell(){
    if (this.props.value.isClicked){
      return this.props.value.isX ? "❌" : "⭕";

    }else{
      return "";
    }
  }


  handleClick() {
    console.log("cell state: "+ this.state.isMyTurn);
    if (!this.props.value.isMyTurn) {
      alert("This is not your turn!");
      return;
    }
    // if (this.state.isX) {
    //   this.setState({ in: "❌" });
    // } else {
    //   this.setState({ in: "⭕" });
    // }

    let req = this.state;
    req["header"] = "update-check";
    this.props.socket.emit("from-client", req);

    // this.props.socket.on("from-server", data => {
    //   if (data.header == "update-check-from-server"){
    //     console.log(data);


        
    //   }
    // });
  }

  render() {
    return (
      <div className="cell" onClick={this.handleClick}>
        {this.getValueInCell()}
      </div>
    );
  }
}

const CellWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Cell {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default CellWithSocket;
