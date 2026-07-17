import { SET_CATEGORY_SONGS, SET_SEARCH_SONGS, SET_SEARCH_QUERY, SET_LOADING, SET_ERROR, SET_NOTIFICATION } from '../actions/actions';

const initialState = {
  rock: [],
  pop: [],
  hiphop: [],
  searchResults: [],
  searchQuery: '',
  isLoading: false,
  error: null,
  notification: null,
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_SONGS:
      return {
        ...state,
        [action.payload.category]: action.payload.songs,
      };
    case SET_SEARCH_SONGS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
};

export default songsReducer;