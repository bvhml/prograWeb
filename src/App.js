import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home'
import Edit from './components/Edit'

function App() {
  
  return (
    <Router>
      <Route path="/" exact component={ Home }/>
      <Route path="/edit" exact component={ Edit }/>
    </Router>
  );
}

export default App;
