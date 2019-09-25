import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home'
import { people } from './assets/data/people'

function App() {



  function setPeopleLocalStorage(){
    return localStorage.setItem('people',JSON.stringify(people));
  }

  setPeopleLocalStorage();

  return (
    <Router>
      <Route path="/" exact component={ Home }/>
      <Route path="/edit" exact component={ Home }/>
    </Router>
  );
}

export default App;
