import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Dropdown } from 'semantic-ui-react';

class ArtworkList extends Component {

  state = {
    filteredArtworks: [],
    searchTagId: '',
    tagsWithArtworks: [],
  };

  componentDidMount() {
    this.setState({filteredArtworks: this.props.allArtworks});
    fetch('http://localhost:3000/api/v1/tags')
      .then(res => res.json())
      .then(tags => this.setState({tagsWithArtworks: tags}));
  }

  handleDropdownSelect = (event, { value }) => {
    this.setState({ searchTagId: value });
    if (value > 0) {
      this.setState({filteredArtworks: this.state.tagsWithArtworks[value-1].artworks });
    } else {
      this.setState({filteredArtworks: this.props.allArtworks})
    }
  }

  render() {
    const { value } = this.state;
    const firstSelection = [{key: 0, text: 'View All', value: null}]
    const mapSelection = this.props.allTags.map(tag => {
      return {key: tag.id, text: tag.name, value: tag.id};
    })
    const allSelection = firstSelection.concat(mapSelection)
    const listArtworks = this.state.filteredArtworks;
    return (
      <div className='all-artwork-dropdown'>
        <Dropdown 
          placeholder='Filter by Tag'
          fluid
          selection
          options={allSelection}
          onChange={this.handleDropdownSelect}
          value={ value }
        />
        {listArtworks.map((artwork, idx) => {
          return(
            <Card key={idx} data-id={artwork.id} onClick={this.props.viewArtworkFromList} color='red' >
              <Image src={`${artwork.img_url}`} alt={artwork.nickname} data-id={artwork.id} size='medium' />
              <Card.Content data-id={artwork.id}>
                <Card.Header data-id={artwork.id} onClick={this.props.viewArtworkFromList} >{artwork.nickname}</Card.Header>
              </Card.Content>
            </Card>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    allArtworks: state.reducer.allArtworks,
    allTags: state.reducer.allTags,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    viewArtworkFromList: (event) => {
      dispatch({ type: 'VIEW_ARTWORK_FROM_LIST', payload: event.target.dataset.id })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkList);