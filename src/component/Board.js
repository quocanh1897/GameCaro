import React from "react";
import Row from "./Row";
import socketIOClient from "socket.io-client";

export default class Board extends React.Component {
  /* Helper Functions */
  constructor(props){
    super(props);

    this.state = {
      response: false,
      endpoint: "localhost:4001",
    };
  }
  
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("send-data", data => {
      alert('from server' + data);
    });

    socket.emit("client-send-data", this.state.response);
  }

  // Gets initial board data
  initBoardData(height, width) {
    let data = this.createEmptyArray(height, width);
    return data;
  }

  createEmptyArray(height, width) {
    let data = [];

    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isX: true,
          isClicked: false
        };
      }
    }
    return data;
  }

  
  renderBoard(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push(<Row row={data[i]} key={i} />);
    }

    return <div>{arr}</div>;
  }

  render() {

    const {height, width, match: {params}} = this.props;
    const roomname = params.room;

    let boardData = this.initBoardData(height, width);
    return (
      <div className="game-board">
        <div className="board" >
          {this.renderBoard(boardData)}
        </div>
      </div>
      
    );
  }
}

