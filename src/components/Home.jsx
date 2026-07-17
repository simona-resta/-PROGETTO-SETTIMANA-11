import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import { fetchSongsAction } from '../redux/actions/actions';
import SongCard from './SongCard';

const Home = () => {
  const dispatch = useDispatch();
  const rockSongs = useSelector((state) => state.songs.rock);
  const popSongs = useSelector((state) => state.songs.pop);
  const hiphopSongs = useSelector((state) => state.songs.hiphop);
  const searchResults = useSelector((state) => state.songs.searchResults);
  const searchQuery = useSelector((state) => state.songs.searchQuery);
  const isLoading = useSelector((state) => state.songs.isLoading);
  const error = useSelector((state) => state.songs.error);

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

      {error && (
        <Alert variant="danger" className="text-center rounded-3 mb-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Si è verificato un errore: {error}
        </Alert>
      )}

      {isLoading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="light" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {!isLoading && (
        <>
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
        </>
      )}
    </Container>
  );
};

export default Home;