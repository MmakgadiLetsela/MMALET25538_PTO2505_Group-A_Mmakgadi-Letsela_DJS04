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
    page,
    setPage,
    totalPages,
    podcasts,
    allPodcastsCount,
  } = useContext(PodcastContext);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };



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
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="pagination-btn"
          >
            Previous
          </button>

          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
