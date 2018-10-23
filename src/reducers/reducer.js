const defaultState = {
  showMap: true,
  allArtworks:[],
  newArtwork: false,
  newMarkerPosition: null,
  currentUser: null,
  selectedArtwork: null,
  mapCenter: [0, 0],
  zoomLevel: 2,
  allTags: [],
  modalOpen: true,
};

const SUBMIT_NEW_ARTWORK = 'SUBMIT_NEW_ARTWORK';
const ADD_NEW_MARKER = 'ADD_NEW_MARKER';
const CHANGE_USER_ID = 'CHANGE_USER_ID';
const FETCH_ALL_ARTWORKS = 'FETCH_ALL_ARTWORKS';
const VIEW_DETAIL_PAGE = 'VIEW_DETAIL_PAGE';
const CHANGE_SELECTED_ARTWORK = 'CHANGE_SELECTED_ARTWORK';
const CLOSE_DETAIL_PAGE = 'CLOSE_DETAIL_PAGE';
const CHANGE_MAP_CENTER = 'CHANGE_MAP_CENTER';
const CHANGE_ZOOM_LEVEL = 'CHANGE_ZOOM_LEVEL';
const ADD_NEW_ARTWORK_TO_MAP = 'ADD_NEW_ARTWORK_TO_MAP';
const FETCH_ALL_TAGS = 'FETCH_ALL_TAGS';
const VIEW_ARTWORK_FROM_LIST = 'VIEW_ARTWORK_FROM_LIST';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_USER = 'LOGIN_USER';
const HANDLE_MODAL_CLOSE = 'HANDLE_MODAL_CLOSE';

function reducer(state=defaultState, action){
  switch(action.type){
    case FETCH_ALL_ARTWORKS:
      return { ...state, allArtworks: action.payload }
    case ADD_NEW_MARKER:
      return { ...state, newMarkerPosition: [action.payload.latlng.lat, action.payload.latlng.lng], newArtwork: !state.newArtwork };
    case SUBMIT_NEW_ARTWORK:
      return { ...state, newArtwork: false }
    case CHANGE_USER_ID:
      return { ...state, currentUser: action.payload }
    case VIEW_DETAIL_PAGE:
      return { ...state, showMap: false, selectedArtwork: action.payload }
    case CLOSE_DETAIL_PAGE:
      return { ...state, showMap: true }
    case CHANGE_SELECTED_ARTWORK:
      return { ...state, selectedArtwork: action.payload }
    case CHANGE_MAP_CENTER:
      return { ...state, mapCenter: action.payload }
    case CHANGE_ZOOM_LEVEL:
      return { ...state, zoomLevel: action.payload }
    case ADD_NEW_ARTWORK_TO_MAP:
      return { ...state, allArtworks: [...state.allArtworks, action.payload] }
    case FETCH_ALL_TAGS:
      return { ...state, allTags: action.payload }
    case VIEW_ARTWORK_FROM_LIST:
      return { ...state, selectedArtwork: state.allArtworks[action.payload - 1] }
    case LOGOUT_USER:
      return { ...state, currentUser: null }
    case LOGIN_USER:
      return { ...state, modalOpen: true }
    case HANDLE_MODAL_CLOSE:
      return { ...state, modalOpen: false }
    default:
      return state;
  }
}

export default reducer;