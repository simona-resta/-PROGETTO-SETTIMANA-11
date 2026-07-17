import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, Toast } from 'react-bootstrap';
import { setNotificationAction } from './redux/actions/actions';
import MyNavbar from './components/myNavbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Library from './components/Library';
import PlaylistDetails from './components/PlaylistDetails';

function App() {
  const notification = useSelector(state => state.songs.notification);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <div className="d-flex">
        <MyNavbar />
        <main className="main-content-scroll">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/playlist/:name" element={<PlaylistDetails />} />
          </Routes>
        </main>
        <Footer />

        <ToastContainer position="top-end" className="p-4" style={{ zIndex: 1060, position: 'fixed', top: '0', right: '0' }}>
          <Toast 
            show={!!notification} 
            onClose={() => dispatch(setNotificationAction(null))} 
            delay={3000} 
            autohide 
            style={{ backgroundColor: '#198754', border: 'none' }}
          >
            <Toast.Body className="text-white fw-bold d-flex align-items-center">
              <i className="bi bi-check-circle-fill me-2 fs-5"></i>
              {notification}
            </Toast.Body>
          </Toast>
        </ToastContainer>

      </div>
    </BrowserRouter>
  );
}

export default App;