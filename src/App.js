import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import MapComponent from './components/MapComponent'


class App extends Component {

  handleButtonClick = () => {
    console.log('main button was clicked')
  }

  render() {
    return (
      <div>
        <Button onClick={ this.handleButtonClick } >THIS IS A BUTTON</Button>
        <MapComponent />
      </div>
    );
  }
}

export default App;
