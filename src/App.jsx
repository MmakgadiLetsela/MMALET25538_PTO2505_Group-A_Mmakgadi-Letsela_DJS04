import { useEffect, useState } from "react";
import PodcastGrid from "./components/Podcast.Grid.jsx";
import { genres } from "./data.js";
import { fetchPodcasts } from "./api/fetchPodcasts.js";
import Header from "./components/Header.jsx";
import { PodcastProvider } from "./context/PodcastContext.jsx";

/**
 * App - The root component of the Podcast Explorer application. It handles:
 * - Fetching podcast data from a remote API
 * - Managing loading and error states
 * - Rendering the podcast grid once data is successfully fetched
 * - Displaying a header and fallback UI during loading or error
 * - Podcast Provider is centalised state management for search, filter, sorting and pagination.
 * @returns {JSX.Element} The rendered application interface
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <>
      <Header />
      <main>
        {loading && (
          <div className="message-container">
            <div className="spinner"></div>
            <p>Loading podcasts...</p>
          </div>
        )}

        {error && (
          <div className="message-container">
            <div className="error">
              Error occurred while tyring fetching podcasts: {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <PodcastProvider initialPodcasts={podcasts}>
            <PodcastGrid genres={genres}/>
          </PodcastProvider>
        )}
      </main>
    </>
  );
}
