import React, { Component } from 'react';
import firebase from 'firebase';
import DashBoard from './components/Dashboard';
import { Container } from 'semantic-ui-react';

class App extends Component {

constructor(props){
  super(props);
  var config = {
    apiKey: "AIzaSyBfrMWGzSACuxX5zfGf_XGx8C1hSPyfHLA",
    authDomain: "mapstory-e8cf1.firebaseapp.com",
    databaseURL: "https://mapstory-e8cf1.firebaseio.com",
    projectId: "mapstory-e8cf1",
    storageBucket: "mapstory-e8cf1.appspot.com",
    messagingSenderId: "229795822262"

  };
  firebase.initializeApp(config);
}

  render() {
    return (
      <Container className="main">
      <DashBoard db={firebase}/>
      </Container>
     
    );
  }
}

export default App;
