import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import VideoList from "../Components/VideoList";
import { fetchFromAPI, normalizeVideoData } from "../utils/api";
import "./Pages.css";

function Search() {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const { items } = await fetchFromAPI('search', {
          part: 'snippet',
          q: query,
          type: 'video',
          maxResults: 20
        });
        const normalized = items.map(normalizeVideoData).filter(v => v !== null);
        setVideos(normalized);
      } catch (err) {
        setError("Failed to load search results. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      getVideos();
    }
  }, [query]);

  return (
    <div>
      <Layout>
        <div className="search-results-header" style={{ padding: "20px 20px 0", color: "white" }}>
          <h2>Search results for: <span style={{ color: "#ff0000" }}>{query}</span></h2>
        </div>
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Searching videos...</p>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <VideoList videos={videos} />
        )}
      </Layout>
    </div>
  );
}

export default Search;
