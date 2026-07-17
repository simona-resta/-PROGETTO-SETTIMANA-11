export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';
export const SET_CATEGORY_SONGS = 'SET_CATEGORY_SONGS';
export const SET_SEARCH_SONGS = 'SET_SEARCH_SONGS';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const RENAME_PLAYLIST = 'RENAME_PLAYLIST';
export const REMOVE_FROM_PLAYLIST = 'REMOVE_FROM_PLAYLIST';

export const setCurrentSongAction = (song) => ({
  type: SET_CURRENT_SONG,
  payload: song,
});

export const toggleLikeAction = (song) => ({
  type: TOGGLE_LIKE,
  payload: song,
});

export const setCategorySongsAction = (category, songs) => ({
  type: SET_CATEGORY_SONGS,
  payload: { category, songs },
});

export const setSearchSongsAction = (songs) => ({
  type: SET_SEARCH_SONGS,
  payload: songs,
});

export const setSearchQueryAction = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const setLoadingAction = (status) => ({
  type: SET_LOADING,
  payload: status,
});

export const setErrorAction = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const addToPlaylistAction = (playlistName, song) => ({
  type: ADD_TO_PLAYLIST,
  payload: { playlistName, song }
});

export const setNotificationAction = (message) => ({
  type: SET_NOTIFICATION,
  payload: message,
});

export const createPlaylistAction = (playlistName) => ({
  type: CREATE_PLAYLIST,
  payload: playlistName,
});

export const deletePlaylistAction = (playlistName) => ({
  type: DELETE_PLAYLIST,
  payload: playlistName,
});

export const renamePlaylistAction = (oldName, newName) => ({
  type: RENAME_PLAYLIST,
  payload: { oldName, newName },
});

export const removeFromPlaylistAction = (playlistName, songId) => ({
  type: REMOVE_FROM_PLAYLIST,
  payload: { playlistName, songId }
});

export const showNotification = (message) => {
  return (dispatch) => {
    dispatch(setNotificationAction(message));
    setTimeout(() => {
      dispatch(setNotificationAction(null));
    }, 3000);
  };
};

export const fetchSongsAction = (artistName, category) => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(setErrorAction(null));

    fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=' + artistName, {
      headers: {
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'Authorization': 'Bearer ' + import.meta.env.VITE_AUTH_TOKEN
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Errore nel recupero dei dati API');
        }
      })
      .then((data) => {
        if (category) {
          dispatch(setCategorySongsAction(category, data.data.slice(0, 4)));
        } else {
          dispatch(setSearchSongsAction(data.data));
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(setErrorAction(err.message)); 
      })
      .finally(() => {
        dispatch(setLoadingAction(false)); 
      });
  };
};