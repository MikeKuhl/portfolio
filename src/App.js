import $ from "jquery";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
    };
  }

  applyPickedLanguage = (pickedLanguage, oppositeLangIconId) => {
    var resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `res_primaryLanguage.json`
        : `res_secondaryLanguage.json`;
    this.loadResumeFromPath(resumePath);
  };

  componentDidMount = () => {
    this.loadSharedData();
    this.applyPickedLanguage(window.$primaryLanguage);
  };

  loadResumeFromPath = (path) => {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  };

  loadSharedData = () => {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data });
        document.title = `${this.state.sharedData.basic_info.name}`;
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  };

  render() {
    return (
      <Router>
        <Header sharedData={this.state.sharedData.basic_info} />
        <Switch>
          <Route exact path='/'>
            <Home
              resumeData={this.state.resumeData}
              sharedData={this.state.sharedData}
            />
          </Route>
          <Route path='/about'>
            <About
              resumeBasicInfo={this.state.resumeData.basic_info}
              sharedBasicInfo={this.state.sharedData.basic_info}
            />
          </Route>
        </Switch>
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </Router>
    );
  }
}

export default App;
