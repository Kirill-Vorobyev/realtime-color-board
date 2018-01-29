import React, { Component } from 'react';
import Layout from './Layout/Layout';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {if(user){this.setState({loading: false});}});
  }

  render() {
    let myAppLayout = <h1>Authenticating...</h1>

    if(!this.state.loading){
      myAppLayout = <Layout/>;
    }
    return (
      myAppLayout
    );
  }
}

export default App;
