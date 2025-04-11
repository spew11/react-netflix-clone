import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import instance from '../../api/axios';

export default function DetailPage() {
  const { movieId } = useParams();
  console.log(movieId)
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
        const request = await instance.get(`/movie/${movieId}`)
        setMovie(request.data);
        console.log(request);
        }

    fetchData();
  }, [movieId])

  if (!movie) {
    return (<div>...loading</div>)
  }
    
    return (
        <section>
            <img
            className='modal__poster-img'
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="poster"
            />
        </section>
  )
}
