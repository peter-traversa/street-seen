import React, { Component } from 'react';
import { Popup } from 'react-leaflet';
import { Form } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { uploadFile } from 'react-s3';


class NewArtPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      nickname: '',
    }
  }
  
  handleFileUpload = (event) => {
    const config = {
      bucketName: 'street-seen',
      region: 'us-east-2',
      accessKeyId: `${process.env.REACT_APP_ACCESS_KEY_ID}`,
      secretAccessKey: `${process.env.REACT_APP_SECRET_ACCESS_KEY}`,
    }
    uploadFile(event.target.files[0], config)
    .then(res => this.setState({img_url: res.location}))
  }

  handleFormSubmit = (event) => {
    const newArtwork = {
      nickname: this.state.nickname,
      latitude: this.props.newMarkerPosition[0],
      longitude: this.props.newMarkerPosition[1],
      img_url: this.state.img_url,
      user_id: this.props.userId,
    }
    this.props.addNewArtworkToMap(newArtwork);
    console.log('form mounted')
    fetch('http://localhost:3000/artworks', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        user_id: this.props.userId, 
        nickname: this.state.nickname, 
        latitude: this.props.newMarkerPosition[0], 
        longitude: this.props.newMarkerPosition[1], 
        img_url: this.state.img_url})
    }).then(res => (this.setState({nickname: '', img_url: '', selectedFile: null})))
      .then(res => (this.props.submitNewArtwork()))
  }
  
  handleInputChange = (event) => {
    this.setState({nickname: event.target.value})
  }

  handleUrlChange = (event) => {
    this.setState({nickname: event.target.value})
  }
  
  render() {
    return (
      <Popup>
        {this.state.selectedFile ? <p>{this.state.selectedFile.name}</p> : <Dropzone onChange={this.handleFileUpload} ></Dropzone>}
        <Form.Field onSubmit={this.handleFormSubmit}>
          <Form.Input type='text' label='Artwork Name' value={this.state.nickname} onChange={this.handleInputChange} />
          <Form.Button content='Submit' />
        </Form.Field>
      </Popup>
    )
  }
}

function mapStateToProps(state) {
  return {
    newMarkerPosition: state.newMarkerPosition,
    userId: state.userId,
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitNewArtwork: () => {
      dispatch({type: 'SUBMIT_NEW_ARTWORK', payload: null})
    },
    addNewArtworkToMap: (newArtwork) => {
      dispatch({type: 'ADD_NEW_ARTWORK_TO_MAP', payload: newArtwork})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArtPopup)
