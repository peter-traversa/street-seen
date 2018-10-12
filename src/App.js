import React, { Component } from 'react';
import MapComponent from './components/MapComponent'
import { Button } from 'semantic-ui-react'


class App extends Component {
  constructor() {
    super()

    this.state = {
      allMarkers: []
    }
  }

  handleButtonClick = () => {
    console.log('main button was clicked');
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <Button primary onClick={this.handleButtonClick}>This is a button</Button>
        <MapComponent />
      </div>
    );
  }
}

export default App;
