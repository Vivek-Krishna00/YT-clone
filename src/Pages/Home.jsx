import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import VideoList from "../components/VideoList";
import { fetchFromAPI, normalizeVideoData } from "../utils/api";
import "./Pages.css";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const data = await fetchFromAPI('videos', {
          chart: 'mostPopular',
          maxResults: 20,
          regionCode: 'US'
        });
        const normalized = data.map(normalizeVideoData);
        setVideos(normalized);
      } catch (err) {
        setError("Failed to load videos. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  return (
    <div>
      <Layout>
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading the latest videos for you...</p>
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

export default Home;