import { useState, useEffect, useCallback } from "react";
import Layout from "../Components/Layout";
import VideoList from "../Components/VideoList";
import { fetchFromAPI, normalizeVideoData } from "../utils/api";
import { useInfiniteScroll } from "../utils/useInfiniteScroll";
import "./Pages.css";

function Home() {
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
        maxResults: 20,
        pageToken: token,
        regionCode: 'IN'
      });

      const normalized = items.map(normalizeVideoData).filter(v => v !== null);
      
      setVideos(prev => token ? [...prev, ...normalized] : normalized);
      setPageToken(nextPageToken || "");
    } catch (err) {
      setError("Failed to load videos. Please try again later.");
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
      <div className="home-page">
        {loading && videos.length === 0 ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading the latest videos for you...</p>
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

export default Home;