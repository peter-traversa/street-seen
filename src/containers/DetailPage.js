import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image, List, Sidebar, Menu } from 'semantic-ui-react';
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
        <Menu>
          <Menu.Item position='left' >
            <Button 
              onClick={this.handleButtonClick}
              content='Toggle Artwork List'
              color='red'
            />
          </Menu.Item>
            <h2>{this.props.selectedArtwork.nickname} Detail Page</h2>
          <Menu.Item position='right' >
            <Button 
              onClick={this.props.closeDetailPage}
              content='Close Detail Page'
              color='red'
              position='right'
            />
          </Menu.Item>
        </Menu>
        <Sidebar.Pushable>
          <Sidebar
            animation='overlay'
            onHide={this.handleSidebarHide}
            visible={this.state.visible}
            width='wide'
          >
            <ArtworkList />
          </Sidebar>
          <Sidebar.Pusher position='center'>
            <Image width='100%' id='detail-page-image' src={`${this.props.selectedArtwork.img_url}`} alt='artwork' />
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