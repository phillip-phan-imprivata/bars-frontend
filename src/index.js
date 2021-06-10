import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Bars } from "./components/Bars.js"

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <Bars />
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);