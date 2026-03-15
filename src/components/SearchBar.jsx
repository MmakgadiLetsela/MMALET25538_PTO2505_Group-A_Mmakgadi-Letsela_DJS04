
import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext.jsx";

/**
 * SearchBar component for filtering podcasts by title.
 * @returns {JSX.Element} The search input field.
 */
export default function SearchBar() {
  const { search, setSearch } = useContext(PodcastContext);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search podcasts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
}
