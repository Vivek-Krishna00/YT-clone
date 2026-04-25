import { useState, useEffect, useCallback } from "react";
import Layout from "../Components/Layout";
import VideoList from "../components/VideoList";
import { fetchFromAPI, normalizeVideoData } from "../utils/api";
import { useInfiniteScroll } from "../utils/useInfiniteScroll";
import "./Pages.css";

function Shorts() {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageToken, setPageToken] = useState("");

  const getShorts = useCallback(async (token = "") => {
    try {
      if (token) setLoadingMore(true);
      else setLoading(true);

      const { items, nextPageToken } = await fetchFromAPI('videos', {
        chart: 'mostPopular',
        maxResults: 20,
        regionCode: 'IN',
        videoCategoryId: '24',
        pageToken: token
      });

      const normalized = items.map(normalizeVideoData).filter(v => v !== null);
      
      setShorts(prev => token ? [...prev, ...normalized] : normalized);
      setPageToken(nextPageToken || "");
    } catch (err) {
      console.error("Failed to load shorts", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    getShorts();
  }, [getShorts]);

  useInfiniteScroll(() => {
    if (pageToken && !loadingMore) {
      getShorts(pageToken);
    }
  }, loading || loadingMore);

  return (
    <Layout>
      <div className="shorts-page-v2">
        <div className="explore-header">
          <h2 className="explore-title">Shorts</h2>
        </div>
        {loading && shorts.length === 0 ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading Shorts...</p>
          </div>
        ) : (
          <VideoList videos={shorts} />
        )}
        {loadingMore && (
          <div className="loading-more">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Shorts;