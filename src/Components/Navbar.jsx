import "./components.css";

function Navbar() {
  return (
    <div className="navbar">
      <h2 className="logo">YouTube</h2>

      <input
        className="search"
        type="text"
        placeholder="Search..."
      />

      <div className="profile">👤</div>
    </div>
  );
}

export default Navbar;