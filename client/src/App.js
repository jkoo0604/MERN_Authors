import React from 'react';
import './App.css';
import { Router, Redirect } from '@reach/router';

import All from './views/All';
import New from './views/New';
import Edit from './views/Edit';

function App() {
  return (
    <div className="App">
      <Router>
        <Redirect from="/" to="/authors" noThrow/>
        <All path="authors/"/>
        <New path="authors/new"/>
        <Edit path="authors/edit/:id"/>
      </Router>    
    </div>
  );
}

export default App;
