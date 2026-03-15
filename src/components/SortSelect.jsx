import { useContext } from 'react';
import { PodcastContext, SORT_OPTIONS } from '../context/PodcastContext.jsx';

/** 
 * SortSelect component for sorting podcasts by various criteria. 
 * @returns {JSX.Element} The sort select dropdown.
 * 
 */

export default function SortSelect () {
    const { sortKey, setSortKey } = useContext(PodcastContext); 

    return (
        <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className='sort-select'
        >
            {SORT_OPTIONS.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.label}
                </option>
            ))}
        </select>

    );

}