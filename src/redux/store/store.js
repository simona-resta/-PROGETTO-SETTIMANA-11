import { configureStore, combineReducers } from '@reduxjs/toolkit';
import playerReducer from '../reducers/playerReducer';
import likesReducer from '../reducers/likesReducer';
import songsReducer from '../reducers/songsReducer';
import playlistsReducer from '../reducers/playlistsReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  likes: likesReducer,
  songs: songsReducer,
  playlists: playlistsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  localStorage.setItem('likedSongs', JSON.stringify(store.getState().likes.likedSongs));
  localStorage.setItem('playlists', JSON.stringify(store.getState().playlists.list));
});

export default store;