import { useState, useEffect, useCallback } from "react";
import Layout from "../Components/Layout";
import VideoList from "../components/VideoList";
import { fetchFromAPI, normalizeVideoData } from "../utils/api";
import { useInfiniteScroll } from "../utils/useInfiniteScroll";
import "./Pages.css";

function Music() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [pageToken, setPageToken] = useState("");

  const getVideos = useCallback(async (token = "") => {
    try {
      if (token) setLoadingMore(true);
      else setLoading(true);

      const { items, nextPageToken } = await fetchFromAPI('videos', {
        chart: 'mostPopular',
        videoCategoryId: '10', 
        maxResults: 20,
        regionCode: 'IN',
        pageToken: token
      });

      const normalized = items.map(normalizeVideoData).filter(v => v !== null);
      setVideos(prev => token ? [...prev, ...normalized] : normalized);
      setPageToken(nextPageToken || "");
    } catch (err) {
      setError("Failed to load music videos. Please try again later.");
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
          <h2 className="explore-title">Music</h2>
        </div>
        {loading && videos.length === 0 ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading music videos...</p>
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

export default Music;