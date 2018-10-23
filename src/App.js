import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from './components/MapComponent';
import LoginModal from './components/LoginModal';
import DetailPage from './containers/DetailPage';
import MapMenu from './components/MapMenu'

const App = props => {
  console.log(props)
  return (
    <div className='parent-div'>
      <LoginModal />
      <MapMenu />
      {this.props.showMap ? <MapComponent /> : <DetailPage />}
    </div>
  );

}

function mapStateToProps(state){
  return {showMap: state.showMap}
}

export default connect(mapStateToProps)(App);
