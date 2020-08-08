import React from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import ActiveLinks from './components/ActiveLinks'
import Dashboard from './components/Dashboard';
import Home from './components/Home';

const App = () => {
  return (
      <Router>
        <div className="app">
          <header className="app-header">
            <Link to="/" className="btn-sm">create link</Link>
            <Link to="/links" className="btn-sm">view links</Link>
            <hr/>
            <h1>tiny wee links</h1>
          </header>
          <main className="container">
            <Switch>
              <Route exact path="/" children={<Home />} />
              <Route exact path="/links" children={<ActiveLinks />} />
              <Route path="/:shortcut" children={<Dashboard />} />
            </Switch>
          </main>
        </div>
      </Router>
  );
}

export default App;
