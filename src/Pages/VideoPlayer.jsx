import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";

function VideoPlayer() {
  const { id } = useParams();

  return (
    <Layout>
      <div className="player-container">
        <div className="video-wrapper-player">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-player-iframe"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}

export default VideoPlayer;