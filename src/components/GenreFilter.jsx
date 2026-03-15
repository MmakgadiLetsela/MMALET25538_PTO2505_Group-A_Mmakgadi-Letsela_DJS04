import { useContext } from 'react';
import { PodcastContext } from '../context/PodcastContext.jsx';


/**
 * GenreFilter component for filtering podcasts by genre.
 * @param {Object} props
 * @param {Array<Object>} props.genres - Array of genre objects.
 * @returns {JSX.Element} The genre select dropdown
 */


export default function GenreFilter ({genres}) {

    const  {genre, setGenre } = useContext(PodcastContext);

    return (
    <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className = 'genre-select'
    >

        <option value='all'>All Genres</option>
        {genres.map((g) => (
            <option key={g.id} value={g.id}>
                {g.title}
            </option>
        ))}

    </select>
    );

}