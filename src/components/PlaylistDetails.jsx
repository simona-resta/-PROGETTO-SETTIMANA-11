import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'; 
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { removeFromPlaylistAction, showNotification } from '../redux/actions/actions';
import SongCard from './SongCard';

const PlaylistDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const likedSongs = useSelector((state) => state.likes.likedSongs);
  const playlists = useSelector((state) => state.playlists.list);
  
  const [refreshedSongs, setRefreshedSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const isPreferiti = name === 'Preferiti';
  const songs = isPreferiti ? likedSongs : (playlists[name] || []);

  useEffect(() => {
    const fetchFreshData = async () => {
      if (songs.length === 0) return;
      
      setLoading(true);
      try {
        const promises = songs.map(async (song) => {
          const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/${song.id}`);
          if (response.ok) {
            return await response.json();
          }
          return song;
        });
        
        const results = await Promise.all(promises);
        setRefreshedSongs(results);
      } catch (error) {
        console.error("Errore aggiornamento dati:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreshData();
  }, [songs]);

  const handleRemove = (songId) => {
    dispatch(removeFromPlaylistAction(name, songId));
    dispatch(showNotification('Rimosso dalla playlist'));
  };

  return (
    <Container fluid className="px-4">
      <div className="d-flex align-items-center mb-4 gap-3">
        <Button variant="link" className="text-white p-0" onClick={() => navigate('/library')}>
          <i className="bi bi-arrow-left fs-3"></i>
        </Button>
        <h2 className="fw-bold m-0">{name}</h2>
      </div>
      
      {loading ? (
        <div className="text-center mt-5 text-white">
          <Spinner animation="border" variant="success" />
          <p>Aggiornamento brani...</p>
        </div>
      ) : songs.length === 0 ? (
        <p className="text-white-50 mt-3">Nessuna canzone in questa playlist.</p>
      ) : (
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {refreshedSongs.map(track => (
            <Col key={track.id}>
              <SongCard 
                track={track}
                onRemove={!isPreferiti ? handleRemove : null} 
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PlaylistDetails;