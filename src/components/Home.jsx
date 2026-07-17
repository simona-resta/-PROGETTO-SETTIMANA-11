import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { fetchSongsAction, setCurrentSongAction, toggleLikeAction } from '../redux/actions/actions';

const SongCard = ({ track }) => {
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.likes.likedSongs);
  const isLiked = likedSongs.includes(track.id);

  const handlePlay = () => {
    dispatch(setCurrentSongAction(track));
  };

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(toggleLikeAction(track.id));
  };

  return (
    <div className="album-card" onClick={handlePlay}>
      <img src={track.album.cover_medium} alt={track.title} className="album-image" />
      
      <div className="d-flex justify-content-between align-items-center mt-3 gap-2">
        <div className="album-title m-0">
          {track.title}
        </div>
        <button className="like-btn-inline" onClick={handleLike}>
          <i className={`bi fs-5 ${isLiked ? 'bi-heart-fill text-success' : 'bi-heart text-white'}`}></i>
        </button>
      </div>

      <div className="album-artist">Artist: {track.artist.name}</div>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const rockSongs = useSelector((state) => state.songs.rock);
  const popSongs = useSelector((state) => state.songs.pop);
  const hiphopSongs = useSelector((state) => state.songs.hiphop);
  const searchResults = useSelector((state) => state.songs.searchResults);
  const searchQuery = useSelector((state) => state.songs.searchQuery);

  useEffect(() => {
    dispatch(fetchSongsAction('queen', 'rock'));
    dispatch(fetchSongsAction('katyperry', 'pop'));
    dispatch(fetchSongsAction('eminem', 'hiphop'));
  }, [dispatch]);

  return (
    <Container fluid className="px-4">
      <Row className="justify-content-center mb-5 d-none d-md-flex">
        <Col xs="auto" className="d-flex gap-4">
          <a href="#" className="top-nav-link">Trending</a>
          <a href="#" className="top-nav-link">Podcast</a>
          <a href="#" className="top-nav-link">Moods and Genres</a>
          <a href="#" className="top-nav-link">New Releases</a>
          <a href="#" className="top-nav-link">Discover</a>
        </Col>
      </Row>

      {searchQuery && searchResults.length > 0 && (
        <div className="mb-5">
          <h2 className="fw-bold mb-4">Search Results for "{searchQuery}"</h2>
          <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {searchResults.map((track) => (
              <Col key={track.id}>
                <SongCard track={track} />
              </Col>
            ))}
          </Row>
        </div>
      )}

      <div className="mb-5">
        <h2 className="fw-bold mb-4">Rock Classics</h2>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {rockSongs.map((track) => (
            <Col key={track.id}>
              <SongCard track={track} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="mb-5">
        <h2 className="fw-bold mb-4">Pop Culture</h2>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {popSongs.map((track) => (
            <Col key={track.id}>
              <SongCard track={track} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="mb-5">
        <h2 className="fw-bold mb-4">#HipHop</h2>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {hiphopSongs.map((track) => (
            <Col key={track.id}>
              <SongCard track={track} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Home;