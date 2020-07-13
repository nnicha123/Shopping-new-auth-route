import React from 'react';
import './App.css';
import Shopping from './Shopping'
import { BrowserRouter as Router, NavLink, Redirect, BrowserRouter } from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Register from './Register'
import Login from './Login'

function App() {
  return (

    <Router className="router">
      <Route exact path='/all' component={Shopping}/>
      <Route exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
    </Router>


  );
}

export default App;
