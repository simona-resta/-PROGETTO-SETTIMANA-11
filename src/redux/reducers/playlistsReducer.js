import { ADD_TO_PLAYLIST, CREATE_PLAYLIST, DELETE_PLAYLIST, RENAME_PLAYLIST, REMOVE_FROM_PLAYLIST } from '../actions/actions';

const defaultPlaylists = {
  'Viaggi': [],
  'Allenamento': [],
  'Relax': []
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
    case CREATE_PLAYLIST:
      if (state.list[action.payload]) {
        return state;
      }
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload]: []
        }
      };
    case DELETE_PLAYLIST:
      const newList = { ...state.list };
      delete newList[action.payload];
      return {
        ...state,
        list: newList
      };
    case RENAME_PLAYLIST:
      const { oldName, newName } = action.payload;
      if (state.list[newName] || !state.list[oldName]) return state;
      const renamedList = { ...state.list };
      renamedList[newName] = renamedList[oldName];
      delete renamedList[oldName];
      return {
        ...state,
        list: renamedList
      };
    case REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.playlistName]: state.list[action.payload.playlistName].filter(
            (s) => s.id !== action.payload.songId
          )
        }
      };
    default:
      return state;
  }
};

export default playlistsReducer;