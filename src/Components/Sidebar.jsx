import { Link, useNavigate } from "react-router-dom";
import "./components.css";

import { 
  Home, 
  PlayCircle, 
  Tv, 
  History, 
  Clock, 
  ThumbsUp, 
  Flame, 
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
  const navigate = useNavigate();

  const primaryItems = [
    { icon: <Home size={22} />, label: "Home", path: "/" },
    { icon: <PlayCircle size={22} />, label: "Shorts", path: "/shorts" },
    { icon: <Tv size={22} />, label: "Subscriptions", path: "/subscriptions" },
  ];

  const secondaryItems = [
    { icon: <History size={22} />, label: "History", path: "/history" },
    { icon: <Clock size={22} />, label: "Watch Later", path: "/watch-later" },
    { icon: <ThumbsUp size={22} />, label: "Liked Videos", path: "/liked-videos" },
  ];

  const exploreItems = [
    { icon: <Flame size={22} />, label: "Trending", path: "/trending" },
    { icon: <Music2 size={22} />, label: "Music", path: "/music" },
    { icon: <Clapperboard size={22} />, label: "Movies", path: "/movies" },
    { icon: <Gamepad2 size={22} />, label: "Gaming", path: "/gaming" },
    { icon: <Trophy size={22} />, label: "Sports", path: "/sports" },
    { icon: <Lightbulb size={22} />, label: "Courses", path: "/courses" },
    { icon: <Shirt size={22} />, label: "Fashion & Beauty", path: "/fashion" },
    { icon: <Podcast size={22} />, label: "Podcasts", path: "/podcasts" },
  ];

  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-section">
        {primaryItems.map((item, index) => (
          <div 
            key={index} 
            className="sidebar-item" 
            onClick={() => handleItemClick(item.path)}
          >
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
          <div 
            key={index} 
            className="sidebar-item" 
            onClick={() => handleItemClick(item.path)}
          >
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
          <div 
            key={index} 
            className="sidebar-item" 
            onClick={() => handleItemClick(item.path)}
          >
            <span className="icon">{item.icon}</span>
            <span className="text">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;