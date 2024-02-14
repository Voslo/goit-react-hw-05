import { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { fetchMovieSearch } from '../../api';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchMovie = async query => {
    setQuery(query.value);
    setSearchParams({ query: query.value });
  };

  useEffect(() => {
    const fetchSearchMovies = async () => {
      const query = searchParams.get('query');
      if (!query) return;
      try {
        setLoading(true);
        const fetchedSearch = await fetchMovieSearch(query);
        setSearchMovies(fetchedSearch.results);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchMovies();
  }, [query, searchParams]);

  return (
    <div>
      <SearchForm onSearch={searchMovie} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {searchMovies.length > 0 && (
        <ul>
          {searchMovies.map(movie => (
            <li key={movie.id}>
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