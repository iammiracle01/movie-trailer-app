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
  const [movie, setMovie] = useState(null);
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
      if (!searchKey && data.results.length > 0) {
        // Only set the first movie on initial load (no search key)
        setMovie(data.results[0]);
        fetchMovie(data.results[0].id);
      } else {
        // Reset movie state when searching
        setMovie(null);
        setTrailer(null);
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
    setSearchKey(""); // Clear searchKey when a movie is selected
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-dark text-white min-h-screen flex flex-col">
      <Header setSearchKey={setSearchKey} fetchMovies={fetchMovies} />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="flex-grow">
          {/* Conditionally render the search results text */}
          {searchKey && !movie && (
            <p className="text-center text-xl p-4 font-semibold bg-black bg-opacity-70 text-gray-200 border-t border-gray-600">
              Showing search results for "<span className="font-bold">{searchKey}</span>"
            </p>
          )}
          {movies.length ? (
            <main className="flex-grow">
              {movie && (
                <Hero
                  movie={movie}
                  trailer={trailer}
                  playing={playing}
                  setPlaying={setPlaying}
                />
              )}
              <MovieList movies={movies} selectMovie={selectMovie} />
            </main>
          ) : (
            <div className="flex-grow flex items-center justify-center text-lg">
              Sorry, no movies found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

