import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import VideoList from "../Components/VideoList";

function History() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    setVideos(history);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('videoHistory');
    setVideos([]);
  };

  return (
    <Layout>
      <div className="history-page">
        <div className="history-header">
          <h2>Watch History</h2>
          {videos.length > 0 && (
            <button className="clear-btn" onClick={clearHistory}>
              Clear History
            </button>
          )}
        </div>
        {videos.length === 0 ? (
          <div className="no-history-container">
            <p className="no-history">No videos in history.</p>
          </div>
        ) : (
          <VideoList videos={videos} />
        )}
      </div>
    </Layout>
  );
}

export default History;
