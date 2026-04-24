import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import VideoPlayer from './pages/VideoPlayer';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;