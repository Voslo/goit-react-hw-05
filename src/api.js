import axios from 'axios';

const API_KEY = '4839d215f6559317ec78e88dd78226cf'; // Замініть на ваш ключ API
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchApiData = async (endpoint, params = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const options = { params: { api_key: API_KEY, ...params } };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Oops, try again.");
  }
};

export const fetchTrending = async () => {
  return fetchApiData('/trending/movie/day', { language: 'en-US' });
};

export const fetchMovieDetails = async movieId => {
  return fetchApiData(`/movie/${movieId}`, { language: 'en-US' });
};

export const fetchMovieSearch = async query => {
  return fetchApiData('/search/movie', { query, include_adult: false, language: 'en-US', page: 1 });
};

export const fetchMovieCast = async movieId => {
  return fetchApiData(`/movie/${movieId}/credits`, { language: 'en-US' });
};

export const fetchMovieReviews = async movieId => {
  return fetchApiData(`/movie/${movieId}/reviews`, { language: 'en-US', page: 1 });
};
