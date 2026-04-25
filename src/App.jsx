import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import VideoPlayer from './Pages/VideoPlayer';
import History from './Pages/History';
import Subscriptions from './Pages/Subscriptions';
import WatchLater from './Pages/WatchLater';
import Shorts from './Pages/Shorts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/history" element={<History />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/shorts" element={<Shorts />} />
      </Routes>
    </Router>
  );
}

export default App;