import { TOGGLE_LIKE } from '../actions/actions';

const savedLikes = JSON.parse(localStorage.getItem('likedSongs')) || [];

const initialState = {
  likedSongs: savedLikes,
};

const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIKE:
      const track = action.payload;
      const isLiked = state.likedSongs.some((song) => song.id === track.id);
      return {
        ...state,
        likedSongs: isLiked
          ? state.likedSongs.filter((song) => song.id !== track.id)
          : [...state.likedSongs, track],
      };
    default:
      return state;
  }
};

export default likesReducer;