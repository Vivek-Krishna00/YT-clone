import VideoCard from "./VideoCard";
import "./components.css";

const VideoList = ({ videos }) => {
  const videoItems = typeof videos === "function" ? videos() : videos;

  if (!videoItems || videoItems.length === 0) {
    return <p className="loading">Loading videos...</p>;
  }

  return (
    <div className="video-grid">
      {videoItems.map((video) => (
        <div
          key={video.id}
          className="video-wrapper">
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
};

export default VideoList;