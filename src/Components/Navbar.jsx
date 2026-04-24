import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./components.css";
import { Menu, Search, User } from "lucide-react";

function Navbar({ toggleSidebar }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query.trim()}`);
    }
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <button className="icon-btn menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="logo-container" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
            alt="YouTube Logo" 
            className="yt-logo-dark"
          />
        </div>
      </div>

      <form className="nav-center" onSubmit={handleSearch}>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-btn" type="submit">
            <Search size={20} />
          </button>
        </div>
      </form>

      <div className="nav-right">
        <div className="profile-avatar">
          <User size={24} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;