import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify, { API, graphqlOperation } from "aws-amplify";
import aws_exports from './aws-exports';
import { listBlogs } from "./graphql/queries";

Amplify.configure(aws_exports);

async function getData() {
 API.graphql(graphqlOperation(listBlogs)).then((evt) => {
   evt.data.listBlogs.items.map((blog, i) => {
     QueryResult.innerHTML += `<p>${blog.id} - ${blog.name}</p>`;
   });
 });
}

const QueryResult = document.getElementById("QueryResult");

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

getData();
