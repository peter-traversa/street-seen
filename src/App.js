import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from './containers/MapComponent';
import LoginModal from './containers/LoginModal';
import DetailPage from './containers/DetailPage';
import MapMenu from './components/MapMenu'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allMarkers: []
    }
  }

  render() {
    return (
      <div className='parent-div'>
        <LoginModal />
        <MapMenu />
        {this.props.showMap ? <MapComponent /> : <DetailPage />}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {showMap: state.reducer.showMap}
}

export default connect(mapStateToProps)(App);
