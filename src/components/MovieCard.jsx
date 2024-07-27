import React from "react";

const MovieCard = ({ movie, selectMovie }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <div className="cursor-pointer transition-transform hover:scale-105" onClick={() => selectMovie(movie)}>
      {movie.poster_path ? (
        <img className="w-full h-[450px] object-cover rounded" src={`${imagePath}${movie.poster_path}`} alt={movie.title} />
      ) : (
        <div className="flex items-center justify-center h-[450px] bg-secondary text-red-600 font-bold">
          No image found
        </div>
      )}
      <h5 className="font-medium p-2 text-lg text-center">{movie.title}</h5>
    </div>
  );
};

export default MovieCard;
