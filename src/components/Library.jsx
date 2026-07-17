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
    <Container fluid className="px-4">
      <h2 className="fw-bold mb-4">Your Library</h2>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        
        <Col>
          <div 
            className="album-card d-flex align-items-center justify-content-center" 
            style={{ aspectRatio: '1', background: 'linear-gradient(135deg, #450af5, #c4efd9)', cursor: 'pointer' }} 
            onClick={() => { navigate('/playlist/Preferiti'); window.scrollTo(0, 0); }}
          >
            <h3 className="text-white fw-bold m-0">Preferiti</h3>
          </div>
        </Col>

        {Object.keys(playlists).map(pName => (
          <Col key={pName}>
            <div 
              className="album-card d-flex align-items-center justify-content-center position-relative" 
              style={{ aspectRatio: '1', backgroundColor: '#282828', cursor: 'pointer' }} 
              onClick={() => { navigate(`/playlist/${pName}`); window.scrollTo(0, 0); }}
            >
              <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
                <div onClick={(e) => startEdit(e, pName)}>
                  <i className="bi bi-pencil text-white fs-6"></i>
                </div>
                <div onClick={(e) => handleDeletePlaylist(e, pName)}>
                  <i className="bi bi-x-circle text-danger fs-5"></i>
                </div>
              </div>
              <h3 className="text-white fw-bold m-0 text-center px-2">{pName}</h3>
            </div>
          </Col>
        ))}

        <Col>
          <div 
            className="album-card d-flex align-items-center justify-content-center" 
            style={{ aspectRatio: '1', backgroundColor: '#181818', border: '2px dashed #535353', cursor: 'pointer' }} 
            onClick={() => { setEditMode(false); setShowModal(true); }}
          >
            <div className="text-center">
              <i className="bi bi-plus-circle fs-1 text-muted mb-2 d-block"></i>
              <h5 className="text-muted fw-bold m-0">Crea Playlist</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-dark text-white border-bottom border-secondary">
          <Modal.Title>{editMode ? 'Rinomina playlist' : 'Crea nuova playlist'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form onSubmit={handleSavePlaylist}>
            <Form.Group>
              <Form.Label>Nome della playlist</Form.Label>
              <Form.Control 
                type="text" 
                value={playlistInput}
                onChange={(e) => setPlaylistInput(e.target.value)}
                autoFocus
                className="bg-black text-white border-secondary"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-top border-secondary">
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button variant="success" style={{ backgroundColor: '#198754', borderColor: '#198754' }} onClick={handleSavePlaylist}>
            {editMode ? 'Salva' : 'Crea'}
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Library;