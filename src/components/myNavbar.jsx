import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { fetchSongsAction, setSearchQueryAction, setSearchSongsAction } from '../redux/actions/actions';

const MyNavbar = () => {
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      dispatch(setSearchQueryAction(query));
      dispatch(fetchSongsAction(query));
      setIsMenuOpen(false);
      navigate('/');
      window.scrollTo(0, 0);
    }
  };

  const handleResetHome = (e) => {
    e.preventDefault();
    setQuery('');
    dispatch(setSearchQueryAction(''));
    dispatch(setSearchSongsAction([]));
    setIsMenuOpen(false);
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="mobile-header d-flex d-md-none justify-content-between align-items-center">
        <Link to="/" className="text-decoration-none d-flex align-items-center" onClick={handleResetHome}>
          <i className="bi bi-spotify text-white fs-2 me-2"></i>
          <span className="fs-4 fw-bold text-white">Spotify</span>
        </Link>
        <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'} fs-2 text-white`}></i>
        </button>
      </div>

      <div className={`sidebar-fixed ${isMenuOpen ? 'open' : ''}`}>
        <div>
          <Link to="/" className="text-decoration-none d-none d-md-flex align-items-center mb-4" onClick={handleResetHome}>
            <i className="bi bi-spotify text-white fs-1 me-2"></i>
            <span className="fs-3 fw-bold text-white">Spotify</span>
          </Link>

          <button className="nav-btn" onClick={handleResetHome}>
            <i className="bi bi-house-door-fill fs-5"></i> Home
          </button>
          <button className="nav-btn" onClick={() => setIsMenuOpen(false)}>
            <i className="bi bi-book-half fs-5"></i> Your Library
          </button>

          <Form onSubmit={handleSearch} className="mt-4">
            <InputGroup>
              <Form.Control
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
              <Button type="submit" variant="outline-light" className="search-btn">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
        </div>

        <div className="d-flex flex-column gap-3 mb-4 mt-4 mt-md-0">
          <button className="sidebar-btn-white">Sign Up</button>
          <button className="sidebar-btn-black">Login</button>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <a href="#" className="footer-links">Cookie Policy</a>
            <span className="text-muted">|</span>
            <a href="#" className="footer-links">Privacy</a>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sidebar-overlay d-md-none" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  );
};

export default MyNavbar;