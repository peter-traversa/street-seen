import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from './components/MapComponent';
import LoginModal from './components/LoginModal';
import DetailPage from './containers/DetailPage';

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
        <LoginModal />
        {this.props.showMap ? <MapComponent /> : <DetailPage />}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {showMap: state.showMap}
}

export default connect(mapStateToProps)(App);
