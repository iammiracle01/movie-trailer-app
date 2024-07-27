import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, selectMovie }) => {
  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map(movie => (
        <MovieCard
          selectMovie={selectMovie}
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default MovieList;
