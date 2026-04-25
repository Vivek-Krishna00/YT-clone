import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import VideoList from "../Components/VideoList";
import { fetchVideosWithDetails, normalizeVideoData } from "../utils/api";
import { useInfiniteScroll } from "../utils/useInfiniteScroll";
import "./Pages.css";

function SearchResult() {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageToken, setPageToken] = useState("");

  const getSearchResults = useCallback(async (token = "") => {
    try {
      if (token) setLoadingMore(true);
      else setLoading(true);

      const { items, nextPageToken } = await fetchVideosWithDetails({
        q: query,
        maxResults: 20,
        pageToken: token
      });
      
      const normalized = items.map(normalizeVideoData).filter(v => v !== null);
      setVideos(prev => token ? [...prev, ...normalized] : normalized);
      setPageToken(nextPageToken || "");
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [query]);

  useEffect(() => {
    setVideos([]);
    setPageToken("");
    getSearchResults();
  }, [query, getSearchResults]);

  useInfiniteScroll(() => {
    if (pageToken && !loadingMore) {
      getSearchResults(pageToken);
    }
  }, loading || loadingMore);

  return (
    <Layout>
      <div className="search-results-header">
        <h2>Results for: <span className="query-highlight">{query}</span></h2>
      </div>
      {loading && videos.length === 0 ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Searching for "{query}"...</p>
        </div>
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
    </Layout>
  );
}

export default SearchResult;