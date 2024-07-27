import React from "react";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie, selectMovie }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div
      className="relative cursor-pointer transition-transform transform hover:scale-105 hover:rotate-1 bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl"
      onClick={() => selectMovie(movie)}
    >
      <div className="relative w-full">
        <img
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          src={movie.poster_path ? `${imagePath}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
          alt={movie.title || "No image available"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
      </div>
      <div className="relative p-4 z-10">
        <h5 className="font-bold text-xl text-center text-white mb-2 truncate">{movie.title}</h5>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-yellow-400 text-sm font-semibold">
            <FaStar className="mr-1 animate-pulse" />
            {rating}
          </div>
          <span className="text-gray-400 text-sm">{releaseYear}</span>
        </div>
        <p className="text-gray-300 text-sm line-clamp-3">
          {movie.overview || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
