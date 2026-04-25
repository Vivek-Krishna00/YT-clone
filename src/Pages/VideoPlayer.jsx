import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import { fetchFromAPI, formatCompactNumber } from "../utils/api";
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share2,
  Clock
} from "lucide-react";
import "./Pages.css";


function VideoPlayer() {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [channelDetail, setChannelDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isInWatchLater, setIsInWatchLater] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    if (videoDetail?.snippet?.channelId) {
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      setIsSubscribed(subscriptions.some(sub => sub.id === videoDetail.snippet.channelId));
      
      const watchLater = JSON.parse(localStorage.getItem('watchLaterVideos') || '[]');
      setIsInWatchLater(watchLater.some(v => v.id === id));

      const liked = JSON.parse(localStorage.getItem('likedVideos') || '[]');
      setIsLiked(liked.some(v => v.id === id));
    }
  }, [videoDetail, id]);

  const handleToggleSubscribe = () => {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    const channelId = videoDetail.snippet.channelId;
    
    let updatedSubscriptions;
    if (isSubscribed) {
      updatedSubscriptions = subscriptions.filter(sub => sub.id !== channelId);
    } else {
      const newSubscription = {
        id: channelId,
        title: videoDetail.snippet.channelTitle,
        thumbnail: channelDetail?.snippet?.thumbnails?.default?.url || `https://api.dicebear.com/7.x/initials/svg?seed=${videoDetail.snippet.channelTitle}`,
        subscribedAt: new Date().toISOString()
      };
      updatedSubscriptions = [newSubscription, ...subscriptions];
    }
    
    localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
    setIsSubscribed(!isSubscribed);
  };

  const handleToggleLike = () => {
    const liked = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    let updatedLiked;
    
    if (isLiked) {
      updatedLiked = liked.filter(v => v.id !== id);
      setIsLiked(false);
    } else {
      const newVideo = {
        id: id,
        title: snippet.title,
        thumbnail: snippet.thumbnails.medium.url,
        channelTitle: snippet.channelTitle,
        views: statistics ? statistics.viewCount : '0',
        postedAt: snippet.publishedAt,
      };
      updatedLiked = [newVideo, ...liked];
      setIsLiked(true);
      setIsDisliked(false);
    }
    
    localStorage.setItem('likedVideos', JSON.stringify(updatedLiked));
  };

  const handleToggleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      if (isLiked) {
        handleToggleLike();
      }
    }
  };

  const handleToggleWatchLater = () => {
    const watchLater = JSON.parse(localStorage.getItem('watchLaterVideos') || '[]');
    let updatedWatchLater;
    
    if (isInWatchLater) {
      updatedWatchLater = watchLater.filter(v => v.id !== id);
    } else {
      const newVideo = {
        id: id,
        title: snippet.title,
        thumbnail: snippet.thumbnails.medium.url,
        channelTitle: snippet.channelTitle,
        views: statistics ? statistics.viewCount : '0',
        postedAt: snippet.publishedAt,
      };
      updatedWatchLater = [newVideo, ...watchLater];
    }
    
    localStorage.setItem('watchLaterVideos', JSON.stringify(updatedWatchLater));
    setIsInWatchLater(!isInWatchLater);
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { items: videoData } = await fetchFromAPI('videos', { id });
        if (!videoData || videoData.length === 0) {
          throw new Error("Video not found");
        }
        const video = videoData[0];
        setVideoDetail(video);

        try {
          const { items: channelData } = await fetchFromAPI('channels', { id: video.snippet.channelId });
          if (channelData && channelData.length > 0) {
            setChannelDetail(channelData[0]);
          }
        } catch (err) {
          console.error("Failed to fetch channel details", err);
        }

        try {
          const { items: commentData } = await fetchFromAPI('commentThreads', { 
            videoId: id, 
            maxResults: 20,
            part: 'snippet'
          });
          setComments(commentData || []);
        } catch (err) {
          console.error("Failed to fetch comments", err);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
    window.scrollTo(0, 0);
  }, [id]);

  const snippet = videoDetail?.snippet;
  const statistics = videoDetail?.statistics;
  const channelSnippet = channelDetail?.snippet;
  const channelStats = channelDetail?.statistics;

  return (
    <Layout>
      <div className="player-page-container single-column">
        <div className="player-main-content">
          <div className="video-wrapper-player">
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
              title={snippet?.title || "YouTube video player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-player-iframe"
            ></iframe>
          </div>

          {loading ? (
            <div className="loading-container-small">
              <div className="spinner-small"></div>
              <p>Loading details...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>Could not load video details. Please check your connection or API key.</p>
            </div>
          ) : snippet ? (
            <>
              <h1 className="video-title-player">{snippet.title}</h1>

              <div className="video-info-actions">
                <div className="channel-section">
                  <div className="channel-info-wrapper">
                    <img 
                      src={channelSnippet?.thumbnails?.default?.url || `https://api.dicebear.com/7.x/initials/svg?seed=${snippet.channelTitle}`} 
                      alt={snippet.channelTitle} 
                      className="channel-avatar-large"
                    />
                    <div className="channel-text">
                      <h3 className="channel-name-player">{snippet.channelTitle}</h3>
                      <p className="subscriber-count">
                        {formatCompactNumber(channelStats?.subscriberCount)} subscribers
                      </p>
                    </div>
                  </div>
                  <button 
                    className={`subscribe-btn-player ${isSubscribed ? 'subscribed' : ''}`}
                    onClick={handleToggleSubscribe}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>

                <div className="video-actions-wrapper">
                  <div className="action-group">
                    <button 
                      className={`action-btn-player join-left ${isLiked ? 'active-action' : ''}`}
                      onClick={handleToggleLike}
                    >
                      <ThumbsUp size={20} fill={isLiked ? "currentColor" : "none"} />
                      <span>{formatCompactNumber(isLiked ? parseInt(statistics?.likeCount || 0) + 1 : statistics?.likeCount)}</span>
                    </button>
                    <div className="action-divider"></div>
                    <button 
                      className={`action-btn-player join-right ${isDisliked ? 'active-action' : ''}`}
                      onClick={handleToggleDislike}
                    >
                      <ThumbsDown size={20} fill={isDisliked ? "currentColor" : "none"} />
                    </button>
                  </div>

                  
                  <button className="action-btn-player">
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>

                  <button 
                    className={`action-btn-player ${isInWatchLater ? 'active-action' : ''}`}
                    onClick={handleToggleWatchLater}
                  >
                    <Clock size={20} fill={isInWatchLater ? "currentColor" : "none"} />
                    <span>{isInWatchLater ? 'Added' : 'Watch Later'}</span>
                  </button>
                </div>
              </div>

              <div className={`description-container ${showFullDescription ? 'expanded' : ''}`}>
                <div className="description-stats">
                  <span>{formatCompactNumber(statistics?.viewCount)} views</span>
                  <span>{new Date(snippet.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="description-text">
                  {snippet.description}
                </div>
                <button 
                  className="show-more-btn" 
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'Show less' : '...more'}
                </button>
              </div>

              <div className="comments-section-player">
                <div className="comments-header">
                  <h3>{formatCompactNumber(statistics?.commentCount)} Comments</h3>
                </div>

                <div className="comments-list">
                  {comments.length > 0 ? (
                    comments.map((comment) => {
                      const commentTopLevel = comment.snippet?.topLevelComment?.snippet;
                      if (!commentTopLevel) return null;
                      return (
                        <div key={comment.id} className="comment-item">
                          <img 
                            src={commentTopLevel.authorProfileImageUrl} 
                            alt={commentTopLevel.authorDisplayName} 
                            className="comment-author-avatar"
                          />
                          <div className="comment-content">
                            <div className="comment-author-info">
                              <span className="comment-author-name">@{commentTopLevel.authorDisplayName}</span>
                              <span className="comment-time">
                                {new Date(commentTopLevel.publishedAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div 
                              className="comment-text" 
                              dangerouslySetInnerHTML={{ __html: commentTopLevel.textDisplay }}
                            />
                            <div className="comment-actions">
                              <div className="action-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <ThumbsUp size={16} />
                                <span>{commentTopLevel.likeCount > 0 ? formatCompactNumber(commentTopLevel.likeCount) : ''}</span>
                              </div>
                              <ThumbsDown size={16} />
                              <span className="reply-text">Reply</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="no-comments">Comments are turned off or not available.</p>
                  )}
                </div>

              </div>
            </>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export default VideoPlayer;