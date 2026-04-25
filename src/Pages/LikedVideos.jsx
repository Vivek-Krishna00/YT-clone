import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import VideoList from "../Components/VideoList";
import "./Pages.css";

function LikedVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    setVideos(liked);
  }, []);

  const clearLiked = () => {
    if (window.confirm("Are you sure you want to remove all videos from Liked Videos?")) {
      localStorage.removeItem('likedVideos');
      setVideos([]);
    }
  };

  return (
    <Layout>
      <div className="history-page">
        <div className="history-header">
          <h2>Liked Videos</h2>
          {videos.length > 0 && (
            <button className="clear-btn" onClick={clearLiked}>
              Remove All
            </button>
          )}
        </div>
        {videos.length === 0 ? (
          <div className="no-history-container">
            <p className="no-history">No liked videos yet.</p>
          </div>
        ) : (
          <VideoList videos={videos} />
        )}
      </div>
    </Layout>
  );
}

export default LikedVideos;
