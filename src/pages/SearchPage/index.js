import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import "./SearchPage.css"
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([[]]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q");

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchSearchMovie = async (debouncedSearchTerm) => {
        try {
            const request = await instance.get(`/search/multi?include_adult=false&query=${debouncedSearchTerm}`)
            console.log(request);
            setSearchResults(request?.data?.results);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm])

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className="search-container">
                {searchResults.map((movie)=> {
                    if (movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl = 
                            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                            return (
                                <div className='movie' key={movie.id}>
                                    <div onClick={() => navigate(`/${movie.id}`)}className='movie__column-poster'>
                                        <img
                                        src={movieImageUrl} alt="movie"
                                        className='movie__poster'
                                        />
                                    </div>
                                </div>
                            )
                    }
                })}
            </section>
        ) : (
            <section className='no-results'>
                <div className="no=results__text">
                    <p>
                        찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.
                    </p>
                </div>
            </section>
        )
    }

  return (
    renderSearchResults()
  );
}
