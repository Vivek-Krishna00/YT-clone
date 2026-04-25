import { Link } from "react-router-dom";
import "./components.css";

function VideoCard({ video }) {
  const addToHistory = () => {
    const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    const updatedHistory = [video, ...history.filter(item => item.id !== video.id)];
    localStorage.setItem('videoHistory', JSON.stringify(updatedHistory.slice(0, 50)));
  };

  return (
    <Link to={`/video/${video.id}`} className="video-card-link" onClick={addToHistory}>
      <div className="video-card">
        <div className="thumbnail-container">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="thumbnail"
          />
          {video.duration && (
            <span className="video-duration">{video.duration}</span>
          )}
        </div>

        <div className="video-info">
          <div className="channel-avatar">
            <img 
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${video.channelTitle}`} 
              alt={video.channelTitle} 
              className="thumbnail" 
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div className="video-details">
            <h3 className="title">{video.title}</h3>
            <p className="channel">{video.channelTitle}</p>
            <p className="meta">
              {video.views} • {video.postedAt}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;