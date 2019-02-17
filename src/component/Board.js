import React from "react";
import Row from "./Row";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";
import socketIOClient from "socket.io-client";

export default class Board extends React.Component {
  /* Helper Functions */
  constructor(props) {
    super(props);

    this.state = {
      room: "",
      playerName: "",
      opponent: "",
      ready: false,
      response: false,
      nameOK: false,
      endpoint: "localhost:4001"
    };
    this.onClick = this.onClick.bind(this);
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
    const socket = socketIOClient(endpoint);

    let req = {
      header: "init",
      room: this.state.room,
      playerName: this.state.playerName
    };
    socket.emit("from-client", req);

    socket.on("from-server", data => {
      if (data.header == "game-start") {
        this.setState({ opponent: data.opponentName, response: true });
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
    //   const { endpoint } = this.state;
    //   const socket = socketIOClient(endpoint);
    //   socket.on("send-data", data => {
    //     alert('from server' + data);
    //   });

    //   // socket.emit("client-send-data", this.state.response);
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
    const {
      height,
      width,
      match: { params }
    } = this.props;

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
          <h4>Player: {this.state.playerName}</h4>
        </label>
        <label>
          <h2>
            vs
          </h2>
        </label>
        <label>
          <h4> {this.state.opponent} </h4>
        </label>
      </div>
    );
    let boardData = this.initBoardData(height, width);

    let board = (
      <div className="board" id="boardplay">
        {this.renderBoard(boardData)}
      </div>
    );

    let waitBar = (
      <div>
        <div>Waiting for opponent to connect...</div>
        <ProgressBar animated now={100} />
      </div>
    );

    return (
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

          {this.state.response ? board : null}
          {this.state.ready && !this.state.response ? waitBar : null}
        </div>
      </div>
    );
  }
}
