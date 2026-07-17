import { useSelector } from 'react-redux';

const Footer = () => {
  const currentSong = useSelector((state) => state.player.currentSong);

  return (
    <div className="player-fixed">
      <div className="d-flex align-items-center" style={{ width: '30%', minWidth: '180px' }}>
        {currentSong ? (
          <>
            <img
              src={currentSong.album.cover_small}
              alt={currentSong.title}
              style={{ width: '56px', height: '56px', borderRadius: '4px', objectFit: 'cover' }}
              className="me-3"
            />
            <div style={{ overflow: 'hidden' }}>
              <div className="text-white fw-semibold text-truncate" style={{ fontSize: '0.85rem' }}>
                {currentSong.title}
              </div>
              <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>
                {currentSong.artist.name}
              </div>
            </div>
          </>
        ) : (
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>
            No track selected
          </div>
        )}
      </div>

      <div className="d-flex flex-column align-items-center" style={{ width: '40%', maxWidth: '600px' }}>
        <div className="d-flex align-items-center gap-4 mb-2">
          <button style={{ background: 'none', border: 'none', color: '#b3b3b3' }} className="fs-5">
            <i className="bi bi-shuffle"></i>
          </button>
          <button style={{ background: 'none', border: 'none', color: '#b3b3b3' }} className="fs-5">
            <i className="bi bi-skip-start-fill"></i>
          </button>
          <button style={{ background: 'none', border: 'none', color: '#ffffff' }} className="fs-3">
            <i className="bi bi-play-circle-fill"></i>
          </button>
          <button style={{ background: 'none', border: 'none', color: '#b3b3b3' }} className="fs-5">
            <i className="bi bi-skip-end-fill"></i>
          </button>
          <button style={{ background: 'none', border: 'none', color: '#b3b3b3' }} className="fs-5">
            <i className="bi bi-repeat"></i>
          </button>
        </div>
        <div className="d-flex align-items-center w-100 gap-2">
          <span className="text-muted" style={{ fontSize: '0.7rem' }}>0:00</span>
          <div className="player-progress-bar">
            <div className="player-progress"></div>
          </div>
          <span className="text-muted" style={{ fontSize: '0.7rem' }}>3:30</span>
        </div>
      </div>

      <div className="d-flex justify-content-end align-items-center gap-3" style={{ width: '30%', minWidth: '120px' }}>
        <button style={{ background: 'none', border: 'none', color: '#b3b3b3' }}>
          <i className="bi bi-list-play"></i>
        </button>
        <button style={{ background: 'none', border: 'none', color: '#b3b3b3' }}>
          <i className="bi bi-speaker"></i>
        </button>
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-volume-up text-muted"></i>
          <div style={{ width: '80px', height: '4px', backgroundColor: '#535353', borderRadius: '2px' }}>
            <div style={{ width: '50%', height: '100%', backgroundColor: '#b3b3b3', borderRadius: '2px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;