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
      newArtwork: null,
      tags: [],
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
    for (let i = 1; i < 13; i++) {
      if (event.target[i].checked) {
        this.setState(prevState=>{
          return {tags: [...prevState.tags, i]}
        })
      }
    }
    const newArtwork = {
      nickname: this.state.nickname,
      latitude: this.props.newMarkerPosition[0],
      longitude: this.props.newMarkerPosition[1],
      img_url: this.state.img_url,
      user_id: this.props.currentUser.id,
      user: this.props.currentUser,
      tags: this.state.tags
    }
    this.props.addNewArtworkToMap(newArtwork);
    fetch('http://localhost:3000/artworks', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        user_id: this.props.currentUser.id, 
        nickname: this.state.nickname, 
        latitude: this.props.newMarkerPosition[0], 
        longitude: this.props.newMarkerPosition[1], 
        img_url: this.state.img_url,
      })
    }).then(res => res.json())
      .then(data => this.setState({newArtwork: data}))
      .then(res => this.state.tags.forEach(tag => {
        fetch('http://localhost:3000/artwork_tags', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            artwork_id: this.state.newArtwork.id,
            tag_id: tag
          })
        })
      }))
      .then(res => (this.setState({nickname: '', img_url: '', selectedFile: false, tags: [], newArtwork: null})))
      .then(res => fetch('http://localhost:3000/artworks')
      .then(r => r.json())
      .then(data => this.props.globalStateArtworks(data)))
      .then(res => (this.props.submitNewArtwork()))
  }
  
  handleInputChange = (event) => {
    this.setState({nickname: event.target.value})
  }

  handleCheckboxChange = (event) => {
    console.log(event.target.key)
  }
  
  render() {
    return (
      <Popup backgroundColor='black' minWidth='400'>
        {this.state.selectedFile ? <Image src={this.state.img_url} size='small' /> : <Dropzone accept='image/jpeg, image/png, image/gif' onChange={this.handleFileUpload} ><p>Try dropping a file here, or click to select a file to upload.<br/>Choose one image file.</p></Dropzone>}
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Input type='text' label='Artwork Name' value={this.state.nickname} onChange={this.handleInputChange} />
          <h3>Tags</h3><br/>
          <Grid columns={2}>
            {this.props.allTags.map(tag => {return <Form.Checkbox type='checkbox' key={tag.id} value={tag.id} label={tag.name} />})}
          </Grid>
            <br/><br/>
          <Form.Button color='red' content='Submit' />
        </Form>
      </Popup>
    )
  }
}

function mapStateToProps(state) {
  return {
    newMarkerPosition: state.newMarkerPosition,
    currentUser: state.currentUser,
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
    globalStateArtworks: (data) => {
      dispatch({type: 'FETCH_ALL_ARTWORKS', payload: data})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArtPopup)
