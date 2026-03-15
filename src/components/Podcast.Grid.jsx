import { useContext } from "react";
import PodcastCard from "./PodcastCard.jsx";
import { PodcastContext } from "../context/PodcastContext.jsx";
import SearchBar from "./SearchBar.jsx";
import GenreFilter from "./GenreFilter.jsx";
import SortSelect from "./SortSelect.jsx";

/**
 * Displays a grid layout of podcast preview cards with search, genre filtering, sorting and pagination. 
 * Each card includes podcast details such as title, image, genres, season count, and updated date.
 *
 * @param {Object} props
 * @param {Array<Object>} props.genres - Array of genre objects used to map genre IDs to titles.
 *
 * @returns {JSX.Element} The rendered grid of podcast cards with controls.
 *
 */
export default function PodcastGrid({ genres }) {
  const {
    podcasts,
    allPodcastsCount,
  } = useContext(PodcastContext);

 


  return (
    <div className="podcast-grid">
      {/* Controls */}
      <div className="controls">
        <SearchBar />
        <div className="filter-container">
          <GenreFilter genres={genres} />
          <SortSelect />
        </div>
      </div>

      {/* Results info */}
      <div className="results-info">
        Showing {podcasts.length} of {allPodcastsCount} podcasts
      </div>

      {/* Grid */}
      <div className="grid">
        {podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} genres={genres} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination/>
    </div>
  );
}
