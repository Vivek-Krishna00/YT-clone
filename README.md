# YouTube Clone (YT-Clone)

A high-fidelity, production-grade YouTube clone built with modern web technologies. This project replicates the core user experience of YouTube, featuring a sleek dark-themed UI, real-time video data fetching, and fully interactive navigation.

## ✨ Features

- **Real-time Data**: Integrated with the YouTube Data API v3 to provide live video content, statistics, and channel details.
- **Modern Dark UI**: A pixel-perfect, YouTube-inspired dark mode interface using Vanilla CSS for maximum performance and flexibility.
- **Dynamic Navigation**:
    - **Home**: Personalized video feed.
    - **Explore**: Categorized browsing for Trending, Music, Movies, Gaming, Sports, Courses, Fashion & Beauty, and Podcasts.
    - **User Library**: Fully functional History, Liked Videos, and Watch Later pages using local storage.
- **Enhanced Video Player**:
    - Immersive video playback.
    - Channel information and real-time subscriber counts.
    - Like/Dislike functionality.
    - Interactive description with "Show more" toggle.
    - Integrated comments section.
    - Convenient "Back" navigation for better UX.
- **Search**: Robust search functionality to find any video on the platform.
- **Responsive Sidebar**: Tiered and collapsible sidebar navigation with high-quality Lucide icons.

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/) (with Vite)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Modern CSS variables and flexbox/grid)
- **API**: [YouTube Data API v3](https://developers.google.com/youtube/v3)

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Himanshubansal-2008/YT-clone.git
   cd YT-clone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your YouTube API Key:
   ```env
   VITE_YOUTUBE_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

This project is optimized for deployment on platforms like **Vercel**. It includes specific fixes for case-sensitive file systems and environment-based API configurations.

## 📸 Screenshots

*(Add your screenshots here)*

---

Developed with ❤️ by [Himanshu](https://github.com/Himanshubansal-2008)