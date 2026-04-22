import VideoCard from "./VideoCard";
import "./components.css";

const VideoList = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return <p className="loading">Loading videos...</p>;
  }


  return (
    <div className="video-grid">
      {videos.map((video) => (
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