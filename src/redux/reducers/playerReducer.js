import { ADD_TO_PLAYLIST } from '../actions/actions';

const defaultPlaylists = {
  'My Favorites': [],
  'Workout Focus': [],
  'Chill Vibes': []
};

const savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || defaultPlaylists;

const initialState = {
  list: savedPlaylists
};

const playlistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_PLAYLIST:
      const { playlistName, song } = action.payload;
      if (state.list[playlistName].some((s) => s.id === song.id)) {
        return state;
      }
      return {
        ...state,
        list: {
          ...state.list,
          [playlistName]: [...state.list[playlistName], song]
        }
      };
    default:
      return state;
  }
};

export default playlistsReducer;