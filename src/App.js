import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home'
import Edit from './components/Edit'
import ContactHelpers from './services/contactsHelpers'

function App() {

  let ContactHelpersMethods = new ContactHelpers();
  
  async function setPeopleLocalStorage(){
    //console.log(await ContactHelpersMethods.getAllContacts());
    return localStorage.setItem('people', JSON.stringify(await ContactHelpersMethods.getAllContacts()));
  }

  setPeopleLocalStorage();

  return (
    <Router>
      <Route path="/" exact component={ Home }/>
      <Route path="/edit" exact component={ Edit }/>
    </Router>
  );
}

export default App;
