import "./components.css";

function VideoCard({ video }) {
  return (
    <div className="video-card">
      <div className="thumbnail-container">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="thumbnail"
        />
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
  );
}

export default VideoCard;