import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../api';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCastDetails, setMovieCastDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCastDetails = async () => {
      try {
        setLoading(true);
        const fetchedCast = await fetchMovieCast(movieId);
        setMovieCastDetails(fetchedCast.cast || []);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCastDetails();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movieCastDetails.length === 0 && (
        <p>No cast details available.</p>
      )}
      {!loading && !error && movieCastDetails.length > 0 && (
        <div className={css.container}>
          <ul className={css.list}>
            {movieCastDetails.map(actor => (
              <li key={actor.id} className={css.item}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.name}
                  className={css.img}
                />
                <h4>{actor.name}</h4>
                <p>Character: {actor.character}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieCast;
