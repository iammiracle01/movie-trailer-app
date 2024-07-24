import React from "react";
import { FaPlay } from "react-icons/fa";
import YouTube from "react-youtube";

const Hero = ({ selectedMovie }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";

  const renderTrailer = () => {
    if (!selectedMovie.videos || !selectedMovie.videos.results) return null;

    const trailer = selectedMovie.videos.results.find((vid) =>
      vid.name.includes('Trailer')
    );

    return trailer ? (
      <YouTube
        videoId={trailer.key}
        opts={{
          height: '390',
          width: '640',
        }}
      />
    ) : null;
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center text-white flex items-end"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url('${imagePath}${selectedMovie.backdrop_path}')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="relative z-10 px-4 py-8 max-w-[80%]">
        {renderTrailer()}
        <button className="mb-6 inline-flex items-center justify-center gap-2 p-2 rounded-lg text-base bg-red-600 text-white shadow-lg transition-transform transform hover:scale-110 ">
        <FaPlay />
            <span>Play Trailer</span>
        </button>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{selectedMovie.title}</h1>
        {selectedMovie.overview && (
          <p className="text-lg md:text-xl leading-relaxed px-4 md:px-0">{selectedMovie.overview}</p>
        )}
      </div>
    </section>
  );
};

export default Hero;
