const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.searchParams.append('key', API_KEY);
    
    if (!params.part) {
      url.searchParams.append('part', 'snippet,statistics,contentDetails');
    }
    
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('YouTube API Error:', errorData);
      throw new Error(`YouTube API Error: ${response.status}`);
    }
    const data = await response.json();
    return {
      items: data.items || [],
      nextPageToken: data.nextPageToken
    };
  } catch (err) {
    console.error('fetchFromAPI failed:', err);
    throw err;
  }
};

export const fetchVideosWithDetails = async (params = {}) => {
  const searchResult = await fetchFromAPI('search', {
    ...params,
    type: 'video',
    part: 'snippet'
  });
  
  if (!searchResult.items || searchResult.items.length === 0) {
    return { items: [], nextPageToken: null };
  }
  
  const videoIds = searchResult.items
    .map(item => item.id?.videoId)
    .filter(Boolean)
    .join(',');
  
  if (!videoIds) {
    return { items: [], nextPageToken: searchResult.nextPageToken };
  }
  
  const detailedVideos = await fetchFromAPI('videos', {
    id: videoIds,
    part: 'snippet,statistics,contentDetails'
  });
  
  return {
    items: detailedVideos.items || [],
    nextPageToken: searchResult.nextPageToken
  };
};

export const formatCompactNumber = (number) => {
  if (number === undefined || number === null) return "0";
  return Intl.NumberFormat("en", { notation: "compact" }).format(number);
};

export const normalizeVideoData = (video) => {
  if (!video) return null;
  const { id, snippet, statistics, contentDetails } = video;
  
  if (!snippet || 
      snippet.title === 'Deleted video' || 
      snippet.title === 'Private video' || 
      !snippet.thumbnails || 
      Object.keys(snippet.thumbnails).length === 0) {
    return null;
  }

  const videoId = typeof id === 'string' ? id : id.videoId;
  if (!videoId) return null;

  const { formatted, totalSeconds } = contentDetails ? parseISODuration(contentDetails.duration) : { formatted: '', totalSeconds: 0 };

  return {
    id: videoId,
    title: snippet.title,
    thumbnail: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || snippet.thumbnails?.high?.url,
    channelTitle: snippet.channelTitle,
    views: statistics?.viewCount ? formatViews(statistics.viewCount) : '0 views',
    postedAt: formatTimeAgo(snippet.publishedAt),
    duration: formatted,
    durationInSeconds: totalSeconds,
  };
};

function parseISODuration(duration) {
  if (!duration) return { formatted: "", totalSeconds: 0 };
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return { formatted: "", totalSeconds: 0 };
  
  const hours = parseInt((match[1] || "0").replace("H", "")) || 0;
  const minutes = parseInt((match[2] || "0").replace("M", "")) || 0;
  const seconds = parseInt((match[3] || "0").replace("S", "")) || 0;
  
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  
  let formatted = "";
  if (hours > 0) {
    formatted += hours + ":";
    formatted += (minutes < 10 ? "0" + minutes : minutes) + ":";
  } else {
    formatted += minutes + ":";
  }
  
  formatted += seconds < 10 ? "0" + seconds : seconds;
  
  return { formatted, totalSeconds };
}

function formatViews(views) {
  if (!views) return '0 views';
  const numViews = parseInt(views);
  if (numViews >= 1000000) {
    return (numViews / 1000000).toFixed(1) + 'M views';
  } else if (numViews >= 1000) {
    return (numViews / 1000).toFixed(1) + 'K views';
  } else {
    return numViews + ' views';
  }
}

function formatTimeAgo(dateString) {
  if (!dateString) return 'unknown date';
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