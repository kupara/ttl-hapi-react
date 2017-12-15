import React, { Component } from 'react';
import ContactManager from './routes/ContactsManager'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header style={{height: 'auto'}} className="App-header">
          <h1 style={{color: 'white'}} className="App-title">Contacts Manager</h1>
        </header>
        <ContactManager/>
      </div>
    );
  }
}

export default App;
