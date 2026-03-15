import { useContext } from "react";
import PodcastCard from "./PodcastCard.jsx";
import { PodcastContext, SORT_OPTIONS } from "../context/PodcastContext.jsx";

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
    search,
    setSearch,
    sortKey,
    setSortKey,
    genre,
    setGenre,
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
        <div className="search-container">
          <input
            type="text"
            placeholder="Search podcasts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="genre-select"
          >
            <option value="all">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title}
              </option>
            ))}
          </select>

          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="sort-select"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
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
