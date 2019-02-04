import React from 'react';

export default class Cell extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      in: ""
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    let {value} = this.props;
    if (value.isX){
      this.setState({in: "❌"});
    }
    else{
      this.setState({in: "⭕"});
    }
  }
  
  render() {  
    return (
      <div className="cell" onClick={this.handleClick}>
        {this.state.in}
      </div>
    );
  }
}

