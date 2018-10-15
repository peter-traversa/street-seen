const defaultState = {
  showMap: true,
  allArtworks:[],
  newArtwork: false,
  newMarkerPosition: null,
  userId: null,
};

const SUBMIT_NEW_ARTWORK = 'SUBMIT_NEW_ARTWORK';
const ADD_NEW_MARKER = 'ADD_NEW_MARKER';
const CHANGE_USER_ID = 'CHANGE_USER_ID';

function reducer(state=defaultState, action){
  switch(action.type){
    case ADD_NEW_MARKER:
      return { ...state, newMarkerPosition: [action.payload.latlng.lat, action.payload.latlng.lng], newArtwork: true };
    case SUBMIT_NEW_ARTWORK:
      return { ...state, newArtwork: false }
    case CHANGE_USER_ID:
      return { ...state, userId: action.payload}
    default:
      return state;
  }
}

export default reducer;