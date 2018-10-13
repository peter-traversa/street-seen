import React, { Component } from 'react';
import { Popup } from 'react-leaflet';
import { Form } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'


export default class NewArtPopup extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      nickname: '',
    }
  }
  
  handleFileUpload = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
    this.setState({nickname: '', selectedFile: null})
  }

  handleInputChange = (event) => {
    this.setState({nickname: event.target.value})
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
        </Form>
      </Popup>
    )
  }
}