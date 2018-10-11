import React, { Component } from 'react';
import MapComponent from './components/MapComponent'
import { Button } from 'semantic-ui-react'


class App extends Component {

  handleButtonClick = () => {
    console.log('main button was clicked')
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
