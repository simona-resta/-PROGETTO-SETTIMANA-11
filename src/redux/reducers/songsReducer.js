import { SET_CATEGORY_SONGS, SET_SEARCH_SONGS, SET_SEARCH_QUERY } from '../actions/actions';

const initialState = {
  rock: [],
  pop: [],
  hiphop: [],
  searchResults: [],
  searchQuery: '',
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
    default:
      return state;
  }
};

export default songsReducer;