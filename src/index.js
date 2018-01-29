import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAUVSWlLdN4NrCCFzsFcp8c7diVBKRar5c",
    authDomain: "realtime-color-board.firebaseapp.com",
    databaseURL: "https://realtime-color-board.firebaseio.com",
    projectId: "realtime-color-board",
    storageBucket: "realtime-color-board.appspot.com",
    messagingSenderId: "562752921514"
  };

firebase.initializeApp(config);
firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  })

ReactDOM.render(<App/>, document.getElementById('root'));

