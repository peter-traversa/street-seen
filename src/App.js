import React, { Component } from 'react';
import MapComponent from './components/MapComponent'
import ModalExampleCloseIcon from './components/LoginModal'
class App extends Component {
  constructor() {
    super()

    this.state = {
      allMarkers: []
    }
  }


  render() {
    return (
      <div>
        <ModalExampleCloseIcon />
        <MapComponent />
      </div>
    );
  }
}

export default App;
