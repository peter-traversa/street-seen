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
    this.setState({selectedFile: event.target.files[0]},()=>console.log(this.state.selectedFile))
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
    this.setState({nickname: ''})
  }

  handleInputChange = (event) => {
    this.setState({nickname: event.target.value}, ()=>console.log(this.state.nickname))
  }

  render() {
    return (
      <Popup>
        <Dropzone onChange={this.handleFileUpload}>
          <p>Drag and drop your pictures here or click to select.</p>
        </Dropzone>
        {this.state.selectedFile ? <p>${this.state.selectedFile.name}</p> : <p></p>}
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Input type='text' label='Artwork Nickname' value={this.state.nickname} onChange={this.handleInputChange} />
        </Form>
      </Popup>
    )
  }
}