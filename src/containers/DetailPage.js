import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image, List, Header, Sidebar } from 'semantic-ui-react';
import ArtworkList from '../components/ArtworkList';

class DetailPage extends Component {
  constructor(){
    super();
    this.state = {
      visible: false,
    };
  }

  handleButtonClick = () => {
    this.setState({visible: !this.state.visible})
  }

  render(props) {
    return (
      <React.Fragment>
        <Header as='h2'>
          <Button 
            onClick={this.handleButtonClick}
            content='Toggle Artwork List'
            color='red'
            floated='left'
            />
          <Button 
            onClick={this.props.closeDetailPage}
            content='Close Detail Page'
            color='red'
            floated='right'
          />
        </Header>
        <Sidebar.Pushable>
          <Sidebar
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={this.state.visible}
            width='wide'
          >
            <ArtworkList />
          </Sidebar>
          <Sidebar.Pusher height='900px'>
            <Image size='large' centered id='detail-page-image' src={`${this.props.selectedArtwork.img_url}`} alt='artwork' />
            <h1>{this.props.selectedArtwork.nickname}</h1>
            <h3>Approximate Location: {this.props.selectedArtwork.latitude}, {this.props.selectedArtwork.longitude}</h3>
            <h3>Image uploaded by: {this.props.selectedArtwork.user.name}</h3>
            <List bulleted horizontal >Image tags: {this.props.selectedArtwork.tags.map(tag => {return <List.Item key={tag.id} >{tag.name}</List.Item>})}</List>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    )
  }
}

function MapStateToProps(state){
  return {
    selectedArtwork: state.selectedArtwork,
    allArtworks: state.allArtworks,
  }
}

function MapDispatchToProps(dispatch){
  return {
    closeDetailPage: () => {
      dispatch({ type: 'CLOSE_DETAIL_PAGE', payload: null })
    }
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(DetailPage)