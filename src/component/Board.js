import React from "react";
import Row from "./Row";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";
import socketIOClient from "socket.io-client";
import SocketContext from "../socket-context";

let socket;
export default class Board extends React.Component {
  /* Helper Functions */
  constructor(props) {
    super(props);
    const {
      height,
      width,
      // match: { params }
    } = this.props;
    this.state = {
      id: "",
      room: "",
      playerName: "",
      opponent: "",
      ready: false,
      response: false,
      nameOK: false,
      isMyTurn: true,
      isX: false,
      holdingX: false,
      oppID: "",
      boardData: this.initBoardData(height, width),
      endpoint: "localhost:4001",
      height: height,
      width: width
    };
    this.onClick = this.onClick.bind(this);
    // this.allowClick = this.allowClick.bind(this);

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmitName = this.handleSubmitName.bind(this);
  }

  onClick() {
    if (!this.state.nameOK) {
      alert("You must choose your name first!");
      return;
    }
    this.setState({ ready: true });

    const { endpoint } = this.state;
    socket = socketIOClient(endpoint);

    let req = {
      header: "init",
      room: this.state.room,
      playerName: this.state.playerName
    };
    socket.emit("from-client", req);

    socket.on("from-server", data => {
      if (data.header === "game-start") {
        console.log(data);
        this.setState({
          id: data.id,
          oppID: data.opponent,
          opponent: data.opponentName,
          response: true,
          isMyTurn: data.isMyTurn,
          isX: data.isX,
          holdingX: data.isX
        });
      }
      if (data.header === "update-check-from-server") {
        this.setState({
          isMyTurn: data.isMyTurn,
          isX: data.isX
        });
        let updatedBoard = this.state.boardData;
        updatedBoard[data.y][data.x].isClicked = true;
        updatedBoard[data.y][data.x].isX = data.isX;
        for (let i = 0; i < this.state.height; i++) {
          for (let j = 0; j < this.state.width; j++) {
            updatedBoard[i][j].isMyTurn = data.isMyTurn;
          }
        }
        this.setState({boardData: updatedBoard})
        
      }

      if (data.header === "check-win-from-server") {
        console.log("WINNER: "+  data.winner);
        if (data.winner === this.state.id ){
          alert("YOU WIN !");
        }else{
          alert("YOU LOSE ...");
        }
      }
    });
  }

  updateInput(event) {
    this.setState({ playerName: event.target.value });
  }

  handleSubmitName() {
    this.setState({ nameOK: true });
  }


  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.setState({ room: params.room });
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
          isClicked: false,
          isMyTurn: true
        };
      }
    }
    return data;
  }

  renderBoard(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push(
        <Row
          id={this.state.id}
          row={data[i]}
          key={i}
          y={i}
          isMyTurn={this.state.isMyTurn}
          isX={this.state.isX}
          oppID={this.state.oppID}
          room={this.state.room}
        />
      );
    }

    return <div>{arr}</div>;
  }

  getPlayerName(){
    if (this.state.response){
      return this.state.holdingX ? "❌" : "⭕"
    }
  }
  getOpp(){
    if (this.state.response){
      return !this.state.holdingX ? "❌" : "⭕"
    }
  }
  
  
  render() {
    let inputName = (
      <div>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Choose your name in game..."
            onChange={this.updateInput}
          />
          <InputGroup.Append>
            <Button variant="outline-primary" onClick={this.handleSubmitName}>
              OK!
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
    let labelName = (
      <div className="vs">
        <label>
          <h4>Player: {this.state.playerName}: {this.getPlayerName()}</h4>
        </label>
        <label>
          <h2>vs</h2>
        </label>
        <label>
          <h4> {this.state.opponent}: {this.getOpp()}</h4>
        </label>
      </div>
    );
    // let boardData = this.initBoardData(height, width);
    // this.setState({boardData: boardData});

    let board = (
      <div className="board" id="boardplay" >
        {this.renderBoard(this.state.boardData)}
      </div>
    );

    let waitBar = (
      <div>
        <div>Waiting for opponent to connect...</div>
        <ProgressBar animated now={100} />
      </div>
    );

    let turningBar = (
      <div className="line-sm">
        <div>Your turn ...</div>
        <ProgressBar animated now={100} variant="info"/>
      </div>
    )

    return (
      <SocketContext.Provider value={socket}>
        <div className="game-board">
          <Button variant="light" className="room-label">
            <Badge variant="light">
              <h2> {this.state.room}</h2>{" "}
            </Badge>
          </Button>
          {this.state.nameOK ? labelName : inputName}
          <div>
            {this.state.ready ? null : (
              <Button
                variant="outline-success"
                onClick={this.onClick}
                className="room-btn"
              >
                READY!
              </Button>
            )}
            {this.state.isMyTurn && this.state.response ? turningBar : null}
            {this.state.response ? board : null}
            {this.state.ready && !this.state.response ? waitBar : null}
          </div>
        </div>
      </SocketContext.Provider>
    );
  }
}
