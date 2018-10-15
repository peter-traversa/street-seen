import React, { Component } from 'react';
import { Popup } from 'react-leaflet';
import { Form } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

class NewArtPopup extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      nickname: '',
      img_url: '',
    }
  }
  
  handleFileUpload = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }

  handleFormSubmit = (event) => {
    console.log(event);
    console.log(this.state.nickname, this.state.img_url);
    this.setState({nickname: '', img_url: '', selectedFile: null})
  }

  handleInputChange = (event) => {
    this.setState({nickname: event.target.value})
  }
  handleUrlChange = (event) => {
    this.setState({img_url: event.target.value})
  }

  render() {
    return (
      <Popup>
        <Dropzone onChange={this.handleFileUpload}>
          <p>Drag and drop your pictures here or click to select files.</p>
        </Dropzone>
        {this.state.selectedFile ? <p>${this.state.selectedFile.name}</p> : <p></p>}
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Input type='text' label='Artwork Nickname' value={this.state.nickname} onChange={this.handleInputChange} />
          <Form.Input type='text' label='Artwork url' value={this.state.img_url} onChange={this.handleUrlChange} />
          <Form.Button content='Submit' />
        </Form>
      </Popup>
    )
  }
}

function mapStateToProps(state) {
  return {
    newMarkerPosition: state.newMarkerPosition,
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//     handleFormSubmit: (event) => {
//       dispatch({type: 'SUBMIT_NEW_ARTWORK', payload: event})
//     }
//   }
// }

export default connect(mapStateToProps)(NewArtPopup)