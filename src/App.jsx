import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (searchKey = "") => {
    setLoading(true);
    setError("");
    const type = searchKey ? "search" : "discover";
    const API_URL = "https://api.themoviedb.org/3";

    try {
      const { data } = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          query: searchKey,
        },
      });

      setSelectedMovie(data.results[0] || {});
      setMovies(data.results);
    } catch (error) {
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchMovies(searchKey);
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [searchKey]);

  useEffect(() => {
    if (selectedMovie.id) {
      fetchMovieDetails(selectedMovie.id);
    }
  }, [selectedMovie]);

  const fetchMovieDetails = async (movieId) => {
    const API_URL = "https://api.themoviedb.org/3";
    try {
      const { data } = await axios.get(`${API_URL}/movie/${movieId}`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          append_to_response: "videos",
        },
      });
      setSelectedMovie(data);
    } catch (error) {
      setError("Failed to fetch movie details. Please try again later.");
    }
  };

  const renderMovies = () =>
    movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} />
    ));

  return (
    <main className="bg-dark text-white min-h-screen">
      <Header setSearchKey={setSearchKey} />
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <Hero selectedMovie={selectedMovie} />
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
            {renderMovies()}
          </div>
        </>
      )}
    </main>
  );
};

export default App;
