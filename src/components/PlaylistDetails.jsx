import { useParams, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { removeFromPlaylistAction, showNotification } from '../redux/actions/actions';
import SongCard from './SongCard';

const PlaylistDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.likes.likedSongs);
  const playlists = useSelector((state) => state.playlists.list);

  const isPreferiti = name === 'Preferiti';
  const songs = isPreferiti ? likedSongs : (playlists[name] || []);

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
      
      {songs.length === 0 ? (
        <p className="text-muted">Nessuna canzone in questa playlist.</p>
      ) : (
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {songs.map(track => (
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