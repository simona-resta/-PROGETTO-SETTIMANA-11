import { configureStore, combineReducers } from '@reduxjs/toolkit';
import playerReducer from '../reducers/playerReducer';
import likesReducer from '../reducers/likesReducer';
import songsReducer from '../reducers/songsReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  likes: likesReducer,
  songs: songsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;