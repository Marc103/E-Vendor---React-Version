import React, { Component } from "react";
import HomePage from "./HomePage";
import StoreAdmin from "./StoreAdmin"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



export default class EntryPage extends Component {
  constructor(props) {
    super(props);

}



  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/home" element ={<HomePage/>}>
          </Route>
          <Route path="/home/StoreAdmin" element={<StoreAdmin />} />
        </Routes>
      </Router>
    );
  }
}