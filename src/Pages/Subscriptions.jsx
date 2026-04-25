import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { fetchFromAPI } from "../utils/api";
import VideoCard from "../components/VideoCard";
import "./Pages.css";


function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subs = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    setSubscriptions(subs);

    const fetchSubscribedContent = async () => {
      setLoading(true);
      try {
        if (subs.length > 0) {
          const allVideos = [];
          for (const sub of subs.slice(0, 5)) {
            const data = await fetchFromAPI('search', {
              channelId: sub.id,
              part: 'snippet',
              order: 'date',
              maxResults: 4,
              type: 'video'
            });
            
            if (data) {
              const normalized = data.map(video => ({
                id: video.id.videoId,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.medium.url,
                channelTitle: video.snippet.channelTitle,
                views: 'Recent',
                postedAt: new Date(video.snippet.publishedAt).toLocaleDateString()
              }));
              allVideos.push(...normalized);
            }
          }
          setVideos(allVideos);
        }
      } catch (err) {
        console.error("Failed to fetch subscribed content", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribedContent();
  }, []);

  return (
    <Layout>
      <div className="subscriptions-page">
        <div className="subscriptions-header">
          <h2>Subscriptions</h2>
        </div>

        {subscriptions.length === 0 ? (
          <div className="no-subscriptions">
            <p>You haven't subscribed to any channels yet.</p>
          </div>
        ) : (
          <>
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Fetching latest videos...</p>
              </div>
            ) : (
              <div className="video-grid">
                {videos.map((video, index) => (
                  <VideoCard key={`${video.id}-${index}`} video={video} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default Subscriptions;
