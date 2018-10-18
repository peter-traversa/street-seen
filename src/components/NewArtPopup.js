import React, { Component } from 'react';
import { Popup } from 'react-leaflet';
import { Form, Image, Grid } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { uploadFile } from 'react-s3';


class NewArtPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      img_url: '',
      nickname: '',
      selectedFile: false,
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
    .then(res => this.setState({img_url: res.location, selectedFile: true}))
  }

  handleFormSubmit = (event) => {
    event.persist()
    console.log(event)
    const newArtwork = {
      nickname: this.state.nickname,
      latitude: this.props.newMarkerPosition[0],
      longitude: this.props.newMarkerPosition[1],
      img_url: this.state.img_url,
      user_id: this.props.userId,
    }
    this.props.addNewArtworkToMap(newArtwork);
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
        img_url: this.state.img_url,
      })
    }).then(res => (this.setState({nickname: '', img_url: '', selectedFile: false})))
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
        {this.state.selectedFile ? <Image src={this.state.img_url} size='small' /> : <Dropzone onChange={this.handleFileUpload} ><p>Try dropping a file here, or click to select files to upload.<br/>Choose one image file.</p></Dropzone>}
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Input type='text' label='Artwork Name' value={this.state.nickname} onChange={this.handleInputChange} />
          <p>Tags</p><br/>
            <Grid columns={2}>
              {this.props.allTags.map(tag => {return <Form.Checkbox key={tag.id} data-id={tag.id} label={tag.name} />})}
            </Grid><br/><br/>
          <Form.Button color='red' inverted content='Submit' />
        </Form>
      </Popup>
    )
  }
}

function mapStateToProps(state) {
  return {
    newMarkerPosition: state.newMarkerPosition,
    userId: state.userId,
    allTags: state.allTags,
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
