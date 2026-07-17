export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';
export const SET_CATEGORY_SONGS = 'SET_CATEGORY_SONGS';
export const SET_SEARCH_SONGS = 'SET_SEARCH_SONGS';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export const setCurrentSongAction = (song) => ({
  type: SET_CURRENT_SONG,
  payload: song,
});

export const toggleLikeAction = (songId) => ({
  type: TOGGLE_LIKE,
  payload: songId,
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