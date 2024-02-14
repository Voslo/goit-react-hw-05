import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api';
import { Loader} from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviewsDetails, setMovieReviewsDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReviewsDetails = async () => {
      try {
        setLoading(true);
        const fetchedReviews = await fetchMovieReviews(movieId);
        setMovieReviewsDetails(fetchedReviews.results || []);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchReviewsDetails();
  }, [movieId]);

  return (
    <div className={css.container}>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movieReviewsDetails.length === 0 && (
        <p>No reviews found.</p>
      )}
      {movieReviewsDetails.length > 0 && (
        <div>
          <ul>
            {movieReviewsDetails.map(review => (
              <li className={css.item} key={review.id}>
                <h2 className={css.title}>{review.author}</h2>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieReviews;
