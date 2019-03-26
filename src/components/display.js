import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
class Display extends Component {
  state = {
    data: [],
    openIssue: "Open Issue",
    fork: "Fork"
  };
  render() {
    console.log("inside display " + this.props.data);
    return (
      <div className="card m-2" style={{ width: "18rem" }}>
        <div className="card-body text-center">
          <img src={this.props.data.avatar_url} alt="Avatar" width="20%" />
          <h5 className="card-title">{this.props.data.name}</h5>
          <div className="d-flex justify-content-between row m-2 p-2">
            <div className="tags">Forks : {this.props.data.forks}</div>
            <div className="tags">
              Open Issues:{this.props.data.open_issues}
            </div>
          </div>
          <p class="card-text">{this.props.data.description}</p>
        </div>
      </div>
    );
  }
}

export default Display;
