import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home'
import Edit from './components/Edit'
import Example from './components/Example'

function App() {

  return (
    <Router>
      <Route path="/" exact component={ Home }/>
      <Route path="/example" exact component={ Example }/>
      <Route path="/edit" exact component={ Edit }/>
    </Router>
  );
}

export default App;
