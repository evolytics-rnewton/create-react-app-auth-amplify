import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import aws_exports from './aws-exports';
import Amplify, { API } from 'aws-amplify';
import * as queries from './graphql/queries';
Amplify.configure(aws_exports);

const QueryResult = API.graphql({ query: queries.listBlogs });

alert(QueryResult);

class App extends Component {
  render() {
    return (
      <div className="App">
        <AmplifySignOut />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
      <div class="app-body">
        <h1>Query Results</h1>
        <div id="QueryResult"></div>
        <hr />
      </div>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App);
