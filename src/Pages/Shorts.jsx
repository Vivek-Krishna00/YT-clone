import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { fetchFromAPI, normalizeVideoData } from "../utils/api";
import { Link } from "react-router-dom";
import "./Pages.css";

function Shorts() {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShorts = async () => {
      try {
        setLoading(true);
        const data = await fetchFromAPI('videos', {
          chart: 'mostPopular',
          maxResults: 20,
          regionCode: 'US',
          videoCategoryId: '24'
        });
        const normalized = data.map(normalizeVideoData);
        setShorts(normalized);
      } catch (err) {
        console.error("Failed to load shorts", err);
      } finally {
        setLoading(false);
      }
    };

    getShorts();
  }, []);

  return (
    <Layout>
      <div className="shorts-page">
        <div className="shorts-grid">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading Shorts...</p>
            </div>
          ) : (
            shorts.map((short) => (
              <Link key={short.id} to={`/video/${short.id}`} className="short-card-link">
                <div className="short-card">
                  <div className="short-thumbnail-container">
                    <img src={short.thumbnail} alt={short.title} className="short-thumbnail" />
                    <div className="short-overlay">
                      <span className="short-title">{short.title}</span>
                      <span className="short-views">{short.views}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Shorts;
