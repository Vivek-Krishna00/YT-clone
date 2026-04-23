import "./components.css";
import { Menu, Search, User } from "lucide-react";

function Navbar({ toggleSidebar }) {
  return (
    <div className="navbar">
      <div className="nav-left">
        <button className="icon-btn menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="logo-container">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
            alt="YouTube Logo" 
            className="yt-logo-dark"
          />
        </div>
      </div>

      <div className="nav-center">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search"
          />
          <button className="search-btn">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="nav-right">
        <div className="profile-avatar">
          <User size={24} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;