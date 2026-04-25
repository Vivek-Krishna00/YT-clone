import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import VideoList from "../Components/VideoList";
import "./Pages.css";

function WatchLater() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const watchLater = JSON.parse(localStorage.getItem('watchLaterVideos') || '[]');
    setVideos(watchLater);
  }, []);

  const clearWatchLater = () => {
    if (window.confirm("Are you sure you want to remove all videos from Watch Later?")) {
      localStorage.removeItem('watchLaterVideos');
      setVideos([]);
    }
  };

  return (
    <Layout>
      <div className="history-page">
        <div className="history-header">
          <h2>Watch Later</h2>
          {videos.length > 0 && (
            <button className="clear-btn" onClick={clearWatchLater}>
              Remove All
            </button>
          )}
        </div>
        {videos.length === 0 ? (
          <div className="no-history-container">
            <p className="no-history">No videos saved for later.</p>
          </div>
        ) : (
          <VideoList videos={videos} />
        )}
      </div>
    </Layout>
  );
}

export default WatchLater;
