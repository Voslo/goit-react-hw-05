import { useEffect, useState } from 'react';
import { fetchTrending } from '../../api';
import { Link, useLocation } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import css from './HomePage.module.css';

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrending();
        setTrending(data.results);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <h1 className={css.title}>Trending today</h1>
      {trending.length > 0 && (
        <ul>
          {trending.map(movie => (
            <li key={movie.id} className={css.list}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                <h2>{movie.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
