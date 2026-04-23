import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import "./components.css";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="main-layout">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`content ${!isSidebarOpen ? "expanded-content" : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;