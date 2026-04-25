import { useState, useEffect, useCallback } from "react";
import Layout from "../Components/Layout";
import VideoList from "../Components/VideoList";
import { useInfiniteScroll } from "../utils/useInfiniteScroll";
import "./Pages.css";

function History() {
  const [allVideos, setAllVideos] = useState([]);
  const [displayVideos, setDisplayVideos] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    const filteredHistory = history.filter(video => {
      if (!video || !video.title || !video.thumbnail) return false;
      if (video.title === 'Deleted video' || video.title === 'Private video') return false;
      return true;
    }).map(video => ({ ...video, isShort: false }));
    
    setAllVideos(filteredHistory);
    setDisplayVideos(filteredHistory.slice(0, itemsPerPage));
  }, []);

  const loadMore = useCallback(() => {
    if (displayVideos.length >= allVideos.length || loadingMore) return;
    
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newItems = allVideos.slice(0, nextPage * itemsPerPage);
      setDisplayVideos(newItems);
      setPage(nextPage);
      setLoadingMore(false);
    }, 500);
  }, [allVideos, displayVideos, page, loadingMore]);

  useInfiniteScroll(loadMore, loadingMore);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire watch history?")) {
      localStorage.removeItem('videoHistory');
      setAllVideos([]);
      setDisplayVideos([]);
    }
  };

  return (
    <Layout>
      <div className="history-page">
        <div className="history-header">
          <h2>Watch History</h2>
          {allVideos.length > 0 && (
            <button className="clear-btn" onClick={clearHistory}>
              Clear History
            </button>
          )}
        </div>
        {allVideos.length === 0 ? (
          <div className="no-history-container">
            <p className="no-history">No videos in history.</p>
          </div>
        ) : (
          <>
            <VideoList videos={displayVideos} />
            {loadingMore && (
              <div className="loading-more">
                <div className="spinner"></div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default History;