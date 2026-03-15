import React, {createContext, useEffect, useState} from 'react';

/**
 *
 */

// eslint-disable-next-line
export const SORT_OPTIONS = [
    { key: 'default', label: 'Default' },
    { key: 'date-desc', label: 'Newest'},
    { key: 'date-asc', label: 'Oldest'},
    { key: 'title-asc', label: 'Title (A-Z)'},
    { key: 'title-desc', label: 'Title (Z-A)'},
];

// eslint-disable-next-line
export const PodcastContext = createContext();

/**
 * PodcastProvider component wraps children in a context with state
 * for searching, sorting, filtering and paginating podcast data.
 * 
 * @param {{children: React.ReactNode, initialPodcasts: Podcast[]}} props
 * @returns {JSX.Element}
 */

export function PodcastProvider({ children, initialPodcasts }) {
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('date-desc');
    const [genre, setGenre] = useState('all');
    const [page,setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

/**
 * Dynamically calculate how many cards can fit on screen.
 * Set a fixed card of 10 cards for tablet and smaller screens.
 * 
 */




    useEffect(() => {
        const calculatePageSize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth < 1024) {
                setPageSize(10);
                return;
            }


            const cardWidth = 250;
            const maxRows = 2;
            const columns = Math.floor(screenWidth / cardWidth);
            const pageSize = columns * maxRows;

            setPageSize(pageSize);
        };

        calculatePageSize();
        window.addEventListener('resize', calculatePageSize);
        return () => window.removeEventListener('resize', calculatePageSize);
    }, []);

/**
 * Applies the current search query, genre filter and sort key
 * to the list of podcasts.
 * @returns {Podcast[]} The filtered and sorted list of podcasts.
 */

    const applyFilters = () => {
        let data = [...initialPodcasts];

        if (search.trim()) {
            const query = search.toLowerCase();
            data = data.filter((podcast) => podcast.title.toLowerCase().includes(query));
        }

        if (genre !== 'all') {
            data = data.filter((podcast) => podcast.genres.includes(Number(genre)));
        } // used for filtering the data based on the search query and selected genre


        switch (sortKey) {
            case 'title-asc': 
            data.sort((a,b) => a.title.localeCompare(b.title));
            break;
            case 'title-desc':
            data.sort((a,b) => b.title.localeCompare(a.title));
            break;
            case 'date-asc':
            data.sort((a,b) => new Date(a.updated) - new Date(b.updated));
            break;
            case 'date-desc':
            data.sort((a,b) => new Date(b.updated) - new Date(a.updated));
            break;
            case 'default':
            default:
            break;
        } // used for sorting the data based on the selected sort key

        return data;
    };


    const filteredPodcasts = applyFilters();
    const totalPages = Math.max(1, Math.ceil(filteredPodcasts.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paged = filteredPodcasts.slice(
    (currentPage - 1) * pageSize, currentPage * pageSize
    );


    useEffect(() => {
        // eslint-disable-next-line
        setPage(1);
    }, [search, sortKey, genre]);

    const contextValue = {
        search,
        setSearch,
        sortKey,
        setSortKey,
        genre,
        setGenre,
        page: currentPage,
        setPage,
        totalPages,
        podcasts: paged,
        allPodcastsCount: filteredPodcasts.length,
    };

    return (
        <PodcastContext.Provider value={contextValue}>
            {children}
        </PodcastContext.Provider>
    );
}
    