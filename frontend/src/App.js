//import logo from './logo.svg';
//import './App.css';

//function App() {
//  return (
  //  <div className="App">
    //  <header className="App-header">
      //  <img src={logo} className="App-logo" alt="logo" />
        //<p>
          //Edit <code>src/App.js</code> and save to reload.
       // </p>
       // <a
       //   className="App-link"
       //   href="https://reactjs.org"
      //    target="_blank"
      //    rel="noopener noreferrer"
      //  >
     //     Learn React
    //    </a>
   //   </header>
  //  </div>
//  );
//}

// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [subfamilies, setSubfamilies] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/subfamilies/')
            .then(response => setSubfamilies(response.data.subfamilies))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {subfamilies.map(subfamily => (
                    <li key={subfamily.idsubfamily}>{subfamily.namesubfamily}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;

