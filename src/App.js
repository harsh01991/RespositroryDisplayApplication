import React, { Component } from "react";
import "./App.css";
import Display from "./components/display";
import { Container, Row, Col } from "reactstrap";
import { Spinner } from "reactstrap";

class App extends Component {
  state = {
    value: "",
    dataArr: [],
    loading: false
  };
  handleSearch = () => {
    let value = this.state.value;
    this.setState({
      loading: true
    });
    fetch("https://api.github.com/search/repositories?q=" + value)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let intialData = [];
        data.items.forEach(item => {
          console.log(item);
          let individualData = {
            name: item.name,
            description: item.description,
            forks: item.forks,
            open_issues: item.open_issues,
            url: item.url,
            avatar_url: item.owner.avatar_url
          };

          intialData.push(individualData);
        });
        this.setState(
          {
            dataArr: intialData,
            loading: false
          },
          () => console.log(this.state.dataArr)
        );
      })
      .catch(e => console.log(e));
  };
  handleInput = e => {
    let value = e.target.value;
    this.setState({
      value
    });
  };
  render() {
    const { dataArr } = this.state;
    let data;
    if (this.state.loading) {
      data = (
        <Spinner
          className="spinner"
          color="primary"
          style={{
            position: "fixed",
            flex: 1,
            margin: "auto",
            top: "50%",
            left: "50%"
          }}
        />
      );
    } else {
      data = (
        <div>
          <div className="card m-5">
            <div className="card-header bg-primary text-white">
              Git Repo Search Filter
            </div>
            <div className="card-body">
              <input
                value={this.state.value}
                type="text"
                onChange={this.handleInput}
              />
              <button
                className="btn btn-primary ml-2"
                onClick={this.handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div className="card m-5">
            <div className="card-header bg-primary text-white">
              Repo Search Result
            </div>
            <Container>
              <Row>
                {dataArr.map(singleData => {
                  return <Display data={singleData} />;
                })}
              </Row>
            </Container>
          </div>
        </div>
      );
    }

    return <div>{data}</div>;
  }
}

export default App;
