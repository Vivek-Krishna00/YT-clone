import Layout from "../Components/Layout";
import VideoList from "../Components/VideoList";

function Home() {
  const videos = [
    {
      id: 1,
      title: "React Tutorial for Beginners",
      thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/hqdefault.jpg",
      channelTitle: "Code Studio",
      views: "142K views",
      postedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Build a YouTube Clone with React",
      thumbnail: "https://i.ytimg.com/vi/FHTbsZEJspU/hqdefault.jpg",
      channelTitle: "Dev Hub",
      views: "87K views",
      postedAt: "1 week ago",
    },
  ];

  return (
    <div>
        <Layout >
          <VideoList videos={videos} />  
        </Layout>
    </div>
  );
}

export default Home;