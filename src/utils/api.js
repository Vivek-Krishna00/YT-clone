const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchFromAPI = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append('key', API_KEY);
  url.searchParams.append('part', 'snippet,statistics');
  
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch from YouTube API');
  }
  const data = await response.json();
  return data.items;
};

// Data normalization helper
export const normalizeVideoData = (video) => {
  const { id, snippet, statistics } = video;
  return {
    id: typeof id === 'string' ? id : id.videoId,
    title: snippet.title,
    thumbnail: snippet.thumbnails.medium.url,
    channelTitle: snippet.channelTitle,
    views: statistics ? formatViews(statistics.viewCount) : 'View count hidden',
    postedAt: formatTimeAgo(snippet.publishedAt),
  };
};

function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M views';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K views';
  } else {
    return views + ' views';
  }
}

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const value = Math.floor(diffInSeconds / seconds);
    if (value >= 1) {
      return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
}
