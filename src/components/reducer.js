const defaultState = {
  showMap: true,
  allArtworks:[],
  newArtwork: false,
  newMarkerPosition: null,
  userId: null,
  selectedArtwork: null,
};

const SUBMIT_NEW_ARTWORK = 'SUBMIT_NEW_ARTWORK';
const ADD_NEW_MARKER = 'ADD_NEW_MARKER';
const CHANGE_USER_ID = 'CHANGE_USER_ID';
const FETCH_ALL_ARTWORKS = 'FETCH_ALL_ARTWORKS';
const VIEW_DETAIL_PAGE = 'VIEW_DETAIL_PAGE';
const CHANGE_SELECTED_ARTWORK = 'CHANGE_SELECTED_ARTWORK';
const CLOSE_DETAIL_PAGE = 'CLOSE_DETAIL_PAGE'

function reducer(state=defaultState, action){
  switch(action.type){
    case FETCH_ALL_ARTWORKS:
      return { ...state, allArtworks: action.payload }
    case ADD_NEW_MARKER:
      return { ...state, newMarkerPosition: [action.payload.latlng.lat, action.payload.latlng.lng], newArtwork: true };
    case SUBMIT_NEW_ARTWORK:
      return { ...state, newArtwork: false }
    case CHANGE_USER_ID:
      return { ...state, userId: action.payload }
    case VIEW_DETAIL_PAGE:
      return { ...state, showMap: false }
    case CLOSE_DETAIL_PAGE:
      return { ...state, showMap: true }
    case CHANGE_SELECTED_ARTWORK:
      return { ...state, selectedArtwork: action.payload }
    default:
      return state;
  }
}

export default reducer;