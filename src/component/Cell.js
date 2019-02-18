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
      isMyTurn: this.props.isMyTurn,
      isX: this.props.isX,
      oppID:this.props.oppID,
      room:this.props.room
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.state.isMyTurn) {
      alert("This is not your turn!");
      return;
    }
    let { value } = this.props;
    if (value.isX) {
      this.setState({ in: "❌" });
    } else {
      this.setState({ in: "⭕" });
    }
    console.log("X: " + this.state.x + " Y: " + this.state.y);
    // this.props.socket.emit("test", "hahahha");
    let req = this.state;
    req["header"] = "update-check";
    this.props.socket.emit("from-client", req);
  }

  render() {
    return (
      <div className="cell" onClick={this.handleClick}>
        {this.state.in}
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
