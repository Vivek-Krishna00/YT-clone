import "./components.css";
import { 
  Home, 
  PlayCircle, 
  Tv, 
  History, 
  ListVideo, 
  Clock, 
  ThumbsUp, 
  Flame, 
  ShoppingBag, 
  Music2, 
  Clapperboard, 
  Gamepad2, 
  Trophy, 
  Lightbulb, 
  Shirt, 
  Podcast,
  ChevronRight
} from "lucide-react";

function Sidebar({ isOpen }) {
  const primaryItems = [
    { icon: <Home size={22} />, label: "Home" },
    { icon: <PlayCircle size={22} />, label: "Shorts" },
    { icon: <Tv size={22} />, label: "Subscriptions" },
  ];

  const secondaryItems = [
    { icon: <History size={22} />, label: "History" },
    { icon: <Clock size={22} />, label: "Watch Later" },
    { icon: <ThumbsUp size={22} />, label: "Liked Videos" },
  ];

  const exploreItems = [
    { icon: <Flame size={22} />, label: "Trending" },
    { icon: <ShoppingBag size={22} />, label: "Shopping" },
    { icon: <Music2 size={22} />, label: "Music" },
    { icon: <Clapperboard size={22} />, label: "Movies" },
    { icon: <Gamepad2 size={22} />, label: "Gaming" },
    { icon: <Trophy size={22} />, label: "Sports" },
    { icon: <Lightbulb size={22} />, label: "Courses" },
    { icon: <Shirt size={22} />, label: "Fashion & Beauty" },
    { icon: <Podcast size={22} />, label: "Podcasts" },
  ];

  return (
    <div className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-section">
        {primaryItems.map((item, index) => (
          <div key={index} className="sidebar-item">
            <span className="icon">{item.icon}</span>
            <span className="text">{item.label}</span>
          </div>
        ))}
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <div className="sidebar-header">
          <span className="text">You</span>
          <ChevronRight size={16} />
        </div>
        {secondaryItems.map((item, index) => (
          <div key={index} className="sidebar-item">
            <span className="icon">{item.icon}</span>
            <span className="text">{item.label}</span>
          </div>
        ))}
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <div className="sidebar-header">
          <span className="text">Explore</span>
        </div>
        {exploreItems.map((item, index) => (
          <div key={index} className="sidebar-item">
            <span className="icon">{item.icon}</span>
            <span className="text">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;