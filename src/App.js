import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from './components/Home'


function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}/>
      <Route path="/edit" exact component={Home}/>
    </Router>
  );
}

export default App;
