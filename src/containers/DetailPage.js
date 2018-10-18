import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image, List, Grid, Sidebar } from 'semantic-ui-react';
import ArtworkList from '../components/ArtworkList';

class DetailPage extends Component {
  constructor(){
    super();
    this.state = {
      visible: false,
    };
  }

  handleButtonClick = () => {
    this.setState({visible: true})
  }

  render(props) {
    return (
      <React.Fragment>
        <div>
          <Button 
            onClick={this.handleButtonClick}
            content='Open Artwork List'
            color='red'
            floated='left'
            />
          <Button 
            onClick={this.props.closeDetailPage}
            content='Close Detail Page'
            color='red'
            floated='right'
          />
        </div>
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
          <Sidebar.Pusher>
            <div>
              <Grid className='ui segment centered'>
                <Image size='big' centered id='detail-page-image' src={`${this.props.selectedArtwork.img_url}`} alt='artwork' />
                <h1>{this.props.selectedArtwork.nickname}</h1>
                <h3>Approximate Location: {this.props.selectedArtwork.latitude}, {this.props.selectedArtwork.longitude}</h3>
                <h3>Image uploaded by: {this.props.selectedArtwork.user.name}</h3>
                <List bulleted horizontal >Image tags: {this.props.selectedArtwork.tags.map(tag => {return <List.Item key={tag.id} >{tag.name}</List.Item>})}</List>
              </Grid>
            </div>
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