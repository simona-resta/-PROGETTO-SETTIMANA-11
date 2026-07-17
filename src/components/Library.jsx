import { useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { createPlaylistAction, deletePlaylistAction, renamePlaylistAction, showNotification } from '../redux/actions/actions';

const Library = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists.list);
  
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [playlistInput, setPlaylistInput] = useState('');
  const [editingName, setEditingName] = useState('');

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setPlaylistInput('');
    setEditingName('');
  };

  const handleSavePlaylist = (e) => {
    e.preventDefault();
    const name = playlistInput.trim();
    if (name === '') return;

    if (editMode) {
      if (name.toLowerCase() === 'preferiti' || (playlists[name] && name !== editingName)) {
        dispatch(showNotification('Nome non valido o già esistente!'));
        return;
      }
      dispatch(renamePlaylistAction(editingName, name));
      dispatch(showNotification(`Playlist rinominata in "${name}"`));
    } else {
      if (name.toLowerCase() === 'preferiti' || playlists[name]) {
        dispatch(showNotification('Nome già esistente!'));
        return;
      }
      dispatch(createPlaylistAction(name));
      dispatch(showNotification(`Playlist "${name}" creata!`));
    }
    handleClose();
  };

  const startEdit = (e, name) => {
    e.stopPropagation();
    setEditingName(name);
    setPlaylistInput(name);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDeletePlaylist = (e, name) => {
    e.stopPropagation();
    dispatch(deletePlaylistAction(name));
    dispatch(showNotification(`Playlist "${name}" eliminata!`));
  };

  return (
    <Container fluid className="px-4 py-4">
      <h2 className="fw-bold mb-4">Your Library</h2>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        
        <Col>
          <div className="album-card h-100" onClick={() => navigate('/playlist/Preferiti')}>
            <div className="playlist-cover-gradient d-flex align-items-center justify-content-center">
              <i className="bi bi-heart-fill text-white fs-1"></i>
            </div>
            <h4 className="fw-bold text-white mb-1">Preferiti</h4>
            <p className="text-white-50 small">Playlist personale</p>
          </div>
        </Col>

        {Object.keys(playlists).map(pName => (
          <Col key={pName}>
            <div className="album-card h-100 position-relative" onClick={() => navigate(`/playlist/${pName}`)}>
              <div className="playlist-cover d-flex align-items-center justify-content-center">
                <i className="bi bi-music-note-beamed"></i>
              </div>
              <h4 className="fw-bold text-white mb-1 text-truncate">{pName}</h4>
              <p className="text-white-50 small mb-0">Playlist</p>
              
              <div className="position-absolute top-0 end-0 p-3 d-flex gap-2">
                <button className="btn-icon" onClick={(e) => startEdit(e, pName)}><i className="bi bi-pencil"></i></button>
                <button className="btn-icon text-danger" onClick={(e) => handleDeletePlaylist(e, pName)}><i className="bi bi-trash"></i></button>
              </div>
            </div>
          </Col>
        ))}

        <Col>
          <div className="album-card h-100 d-flex flex-column align-items-center justify-content-center border-dashed" onClick={() => { setEditMode(false); setShowModal(true); }}>
            <i className="bi bi-plus-circle fs-1 text-muted mb-2"></i>
            <h5 className="text-muted fw-bold">Crea Playlist</h5>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose} centered variant="dark">
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title>{editMode ? 'Rinomina playlist' : 'Crea nuova playlist'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form onSubmit={handleSavePlaylist}>
            <Form.Control type="text" value={playlistInput} onChange={(e) => setPlaylistInput(e.target.value)} autoFocus className="bg-black text-white border-secondary" placeholder="Nome della playlist" />
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="outline-secondary" onClick={handleClose}>Annulla</Button>
          <Button variant="success" onClick={handleSavePlaylist} style={{ backgroundColor: '#1db954', border: 'none' }}>Salva</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Library;