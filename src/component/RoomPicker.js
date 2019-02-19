import React from "react";

import Button from "react-bootstrap/Button";
import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link} from "react-router-dom";

class RoomPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      NumberRoom: 0
    };
    this.EnableRoom = this.EnableRoom.bind(this);
  }
  EnableRoom() {
    console.log(this.state.rows);
    let number = this.state.NumberRoom;
    let link = "/play/room" + number;
    let tempRows = this.state.rows;
    tempRows.push(
      <Link to={link} key={number}>
        <Button className="room-btn" size="lg" variant="outline-info" block>
          Room#{number < 10 ? "0" + number : number}
        </Button>
      </Link>
    );
    this.setState({ rows: tempRows });
    this.setState({ NumberRoom: number + 1 });
  }
  render() {
    return (
      <div>
        <div className="line">
          <Button
            variant="outline-primary"
            className="create-btn"
            onClick={this.EnableRoom}
          >
            Create Room
          </Button>
        </div>
        <div className="wrapper-room-btn">{this.state.rows}</div>
      </div>
    );
  }
}

export default RoomPicker;
