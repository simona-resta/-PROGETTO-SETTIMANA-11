import { TOGGLE_LIKE } from '../actions/actions';

const initialState = {
  likedSongs: [],
};

const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIKE:
      const isLiked = state.likedSongs.includes(action.payload);
      return {
        ...state,
        likedSongs: isLiked
          ? state.likedSongs.filter((id) => id !== action.payload)
          : [...state.likedSongs, action.payload],
      };
    default:
      return state;
  }
};

export default likesReducer;