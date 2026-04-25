import { useState, useEffect, useCallback } from "react";
import Layout from "../Components/Layout";
import VideoList from "../components/VideoList";
import { fetchVideosWithDetails, normalizeVideoData } from "../utils/api";
import { useInfiniteScroll } from "../utils/useInfiniteScroll";
import "./Pages.css";

function Movies() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [pageToken, setPageToken] = useState("");

  const getVideos = useCallback(async (token = "") => {
    try {
      if (token) setLoadingMore(true);
      else setLoading(true);

      const { items, nextPageToken } = await fetchVideosWithDetails({
        q: 'full movie',
        videoCategoryId: '1',
        videoDuration: 'long',
        maxResults: 20,
        regionCode: 'IN',
        pageToken: token
      });

      const normalized = items.map(normalizeVideoData).filter(v => v !== null);
      setVideos(prev => token ? [...prev, ...normalized] : normalized);
      setPageToken(nextPageToken || "");
    } catch (err) {
      setError("Failed to load movies. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  useInfiniteScroll(() => {
    if (pageToken && !loadingMore) {
      getVideos(pageToken);
    }
  }, loading || loadingMore);

  return (
    <Layout>
      <div className="explore-page">
        <div className="explore-header">
          <h2 className="explore-title">Movies</h2>
        </div>
        {loading && videos.length === 0 ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading movies...</p>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <VideoList videos={videos} />
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

export default Movies;