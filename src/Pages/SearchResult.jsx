import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import VideoList from "../Components/VideoList";
import { fetchFromAPI, normalizeVideoData } from "../utils/api";

function SearchResult() {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        setLoading(true);
        const data = await fetchFromAPI('search', {
          q: query,
          maxResults: 20,
          type: 'video'
        });
        const normalized = data.map(normalizeVideoData);
        setVideos(normalized);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    getSearchResults();
  }, [query]);

  return (
    <Layout>
      <div className="search-results-header">
        <h2>Results for: <span className="query-highlight">{query}</span></h2>
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Searching for "{query}"...</p>
        </div>
      ) : (
        <VideoList videos={videos} />
      )}
    </Layout>
  );
}

export default SearchResult;