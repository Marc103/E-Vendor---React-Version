import React, { Component } from "react";
import { render } from "react-dom";
import EntryPage from './EntryPage'



export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <EntryPage />;
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);