import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Dropdown } from 'semantic-ui-react';



class ArtworkList extends Component {

  state = {
    filtered: false,
    filteredArtworks: [],
    searchTagId: '',
  }

  handleDropdownSelect = (event, { value }) => {this.setState({ searchTagId: value })}

  render() {

    const { value } = this.state;

    const allTagsForDropdown = this.props.allTags.map(tag => {
      return {key: tag.id, text: tag.name, value: tag.id};
    })

    const listArtworks = this.props.allArtworks;

    return (
      <React.Fragment>
        <Dropdown 
          placeholder='Filter by Tag'
          fluid
          selection
          options={allTagsForDropdown}
          onChange={this.handleDropdownSelect}
          value={ value }
        />
        {listArtworks.map(artwork => {
          return(
            <Card key={artwork.id} color='red' >
              <Image src={`${artwork.img_url}`} alt={artwork.nickname} data-id={artwork.id} onClick={this.props.viewArtworkFromList} size='medium' />
              <Card.Content>
                <Card.Header >{artwork.nickname}</Card.Header>
              </Card.Content>
            </Card>
          )
        })}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    allArtworks: state.allArtworks,
    allTags: state.allTags,
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