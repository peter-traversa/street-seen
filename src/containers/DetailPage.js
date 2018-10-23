import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image, List, Sidebar, Grid } from 'semantic-ui-react';
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
      <div className='brick-background'>
        <Grid>
          <Grid.Row columns={3} >
            <Grid.Column>
              <Button 
                onClick={this.handleButtonClick}
                content={this.state.visible ? 'Close All Artworks' : 'Open All Artworks'}
                color='black'
                floated='left'
              />
            </Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <Button 
                onClick={this.props.closeDetailPage}
                content='Close Detail Page'
                color='black'
                floated='right'
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
          <Sidebar.Pushable>
            <Sidebar 
              animation='overlay'
              onHide={this.handleSidebarHide}
              visible={this.state.visible}
              width='wide'
            >
              <ArtworkList />
            </Sidebar>
            <Sidebar.Pusher>
              <Grid textAlign='center'>
                <Grid.Row>
                  <h3 text-align='center'>Image uploaded by: &nbsp;{this.props.selectedArtwork.user.name}</h3>
                </Grid.Row>
                <Grid.Row>
                  <h3>Approximate Location: &nbsp;{this.props.selectedArtwork.latitude}, &nbsp;{this.props.selectedArtwork.longitude}</h3>
                </Grid.Row>
                <Grid.Row>
                  <h3>Tags: &nbsp;</h3><List bulleted horizontal >Image tags: {this.props.selectedArtwork.tags.map(tag => {return <List.Item key={tag.id} ><h3>{tag.name}</h3></List.Item>})}</List><br/>
                </Grid.Row>
              </Grid>
                <Image size='massive' centered id='detail-page-image' src={`${this.props.selectedArtwork.img_url}`} alt='artwork' />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
      </div>
    )
  }
}

function MapStateToProps(state){
  return {
    selectedArtwork: state.reducer.selectedArtwork,
    allArtworks: state.reducer.allArtworks,
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