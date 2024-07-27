import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";
import Loading from "./components/Loading";
import Error from "./components/Error";

const App = () => {
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const MOVIE_API = "https://api.themoviedb.org/3/";
  const SEARCH_API = `${MOVIE_API}search/movie`;
  const DISCOVER_API = `${MOVIE_API}discover/movie`;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = useCallback(async (searchKey = "") => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(searchKey ? SEARCH_API : DISCOVER_API, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          query: searchKey,
        },
      });

      setMovies(data.results);
      setMovie(data.results[0] || { title: "No Movies Found" });

      if (data.results.length) {
        await fetchMovie(data.results[0].id);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMovie = async (movieId) => {
    try {
      const { data } = await axios.get(`${MOVIE_API}movie/${movieId}`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          append_to_response: "videos",
        },
      });

      if (data.videos && data.videos.results) {
        const trailerIndex = data.videos.results.findIndex(
          (vid) =>
            vid.name.includes("Official Trailer") ||
            vid.name.includes("Trailer")
        );

        const trailer =
          trailerIndex !== -1
            ? data.videos.results[trailerIndex]
            : data.videos.results[0];
        setTrailer(trailer);
      }

      setMovie(data);
    } catch (err) {
      setError("Failed to fetch movie details. Please try again later.");
    }
  };

  const selectMovie = (movie) => {
    fetchMovie(movie.id);
    setPlaying(false);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-dark text-white min-h-screen flex flex-col">
      <Header setSearchKey={setSearchKey} fetchMovies={fetchMovies} />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message={error} />
      ) : movies.length ? (
        <main className="flex-grow">
          <Hero
            movie={movie}
            trailer={trailer}
            playing={playing}
            setPlaying={setPlaying}
          />
          <MovieList movies={movies} selectMovie={selectMovie} />
        </main>
      ) : (
        <div className="flex-grow flex items-center justify-center text-lg">
          Sorry, no movies found
        </div>
      )}
    </div>
  );
};

export default App;
