import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const currentSong = useSelector((state) => state.player.currentSong);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    if (audioRef.current && currentSong?.preview) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Errore riproduzione:", err));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const updateProgress = () => {
    if (audioRef.current?.duration) {
      const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percent || 0);
    }
  };

  const handleVolumeChange = (e) => {
    const val = e.target.value;
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val / 100;
  };

  const getVolumeIcon = () => {
    if (volume == 0) return 'bi-volume-mute';
    if (volume < 50) return 'bi-volume-down';
    return 'bi-volume-up';
  };

  return (
    <div className="player-fixed">
      <audio 
        key={currentSong?.id}
        ref={audioRef} 
        src={currentSong?.preview}
        onTimeUpdate={updateProgress}
        onEnded={() => setIsPlaying(false)}
      />

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
            Nessun brano selezionato
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
          <button 
            style={{ background: 'none', border: 'none', color: '#ffffff' }} 
            className="fs-3" 
            onClick={togglePlay}
            disabled={!currentSong}
          >
            <i className={`bi ${isPlaying ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'}`}></i>
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
            <div className="player-progress" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-muted" style={{ fontSize: '0.7rem' }}>0:30</span>
        </div>
      </div>

      <div className="d-flex justify-content-end align-items-center gap-3" style={{ width: '30%', minWidth: '120px' }}>
        <button style={{ background: 'none', border: 'none', color: '#b3b3b3' }}>
          <i className="bi bi-list-play"></i>
        </button>
        <div className="d-flex align-items-center gap-2">
          <i className={`bi ${getVolumeIcon()} text-white`} style={{ fontSize: '1.2rem' }}></i>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} 
            onChange={handleVolumeChange} 
            className="volume-slider"
            style={{ '--volume': `${volume}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;