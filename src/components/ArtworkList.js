import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Dropdown } from 'semantic-ui-react';



class ArtworkList extends Component {

  state = {}

  handleDropdownSelect = (e, { value }) => this.setState({ value })

  render() {

    const { value } = this.state;

    const allTagsForDropdown = this.props.allTags.map(tag => {
      return {key: tag.id, text: tag.name, value: tag.id}
    })

    return (
      <React.Fragment>
        <Dropdown 
          placeholder='Artwork Tags'
          fluid
          multiple selection
          options={allTagsForDropdown}
          onChange={this.handleDropdownSelect}
          value={ value }
        />
        {this.props.allArtworks.map(artwork => {
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
      event.persist();
      dispatch({ type: 'VIEW_ARTWORK_FROM_LIST', payload: event.nativeEvent.target.dataset.id })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkList);