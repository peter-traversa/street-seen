import React, { Component } from 'react';
import MapComponent from './components/MapComponent'


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
        <MapComponent />
      </div>
    );
  }
}

export default App;
