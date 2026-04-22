import "./components.css";

function VideoCard({ video }) {
  return (
    <div className="video-card">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="thumbnail"
      />

      <div className="video-info">
        <h3 className="title">{video.title}</h3>
        <p className="channel">{video.channelTitle}</p>
        <p className="meta">
          {video.views} • {video.postedAt}
        </p>
      </div>
    </div>
  );
}

export default VideoCard;