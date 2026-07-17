import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { setCurrentSongAction, toggleLikeAction, addToPlaylistAction, showNotification } from '../redux/actions/actions';

const SongCard = ({ track, onRemove }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.likes.likedSongs);
  const playlists = useSelector((state) => state.playlists.list);
  const isLiked = likedSongs.some((song) => song.id === track.id);

  const handlePlay = () => {
    console.log("Cliccata canzone:", track);
    if (!track.preview) {
      console.warn("Questa canzone non ha un link di anteprima disponibile.");
      dispatch(showNotification("Anteprima non disponibile per questo brano"));
      return;
    }
    dispatch(setCurrentSongAction(track));
  };

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(toggleLikeAction(track));
    const message = isLiked ? 'Rimosso dai preferiti' : 'Aggiunto ai preferiti';
    dispatch(showNotification(message));
  };

  const handleAddToPlaylist = (e, playlistName) => {
    e.stopPropagation();
    dispatch(addToPlaylistAction(playlistName, track));
    dispatch(showNotification(`Aggiunto a ${playlistName}`));
    setShowDropdown(false); 
  };

  return (
    <div className="album-card" onClick={handlePlay}>
      <img src={track.album.cover_medium} alt={track.title} className="album-image" />
      
      <div className="d-flex justify-content-between align-items-center mt-3 gap-2">
        <div className="album-title m-0">
          {track.title}
        </div>
        
        <div className="d-flex align-items-center gap-2 flex-shrink-0">
          {onRemove && (
            <button 
              className="like-btn-inline text-danger" 
              onClick={(e) => { e.stopPropagation(); onRemove(track.id); }}
            >
              <i className="bi bi-trash fs-5"></i>
            </button>
          )}

          <Dropdown 
            show={showDropdown} 
            onToggle={(isOpen) => setShowDropdown(isOpen)} 
            onClick={(e) => e.stopPropagation()}
          >
            <Dropdown.Toggle variant="link" className="custom-dropdown-toggle p-0 border-0 text-white shadow-none d-flex align-items-center text-decoration-none">
              <i className="bi bi-plus-circle fs-5"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Header>Aggiungi a playlist</Dropdown.Header>
              {Object.keys(playlists).map((pName) => (
                <Dropdown.Item key={pName} onClick={(e) => handleAddToPlaylist(e, pName)}>
                  {pName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <button className="like-btn-inline" onClick={handleLike} style={{ background: 'none', border: 'none', padding: 0 }}>
            <i className={`bi fs-5 ${isLiked ? 'bi-heart-fill text-success' : 'bi-heart text-white'}`}></i>
          </button>
        </div>
      </div>

      <div className="album-artist">Artist: {track.artist.name}</div>
    </div>
  );
};

export default SongCard;