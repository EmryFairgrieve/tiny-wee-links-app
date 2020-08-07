import React from 'react';
import './App.css';
import axios from 'axios';
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

const App = () => {
  // const client = new ApolloClient({
  //   uri: 'https://localhost:32768/api/graphql/'
  // });


  //
  // axios.post('/user', {
  //   firstName: 'Fred',
  //   lastName: 'Flintstone'
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  return (
      <Router>
        <div className="app">
          <header className="app-header">
            <h1>Tiny Wee Links</h1>
          </header>
          <main className="container">
            <Switch>
              <Route exact path="/" children={<Home />} />
              <Route path="/:shortcut" children={<Dashboard />} />
            </Switch>
          </main>
        </div>
      </Router>
  );
}

export default App;
