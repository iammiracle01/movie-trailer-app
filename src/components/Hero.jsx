import React from "react";
import Youtube from "react-youtube";
import { FaPlay, FaTimes } from "react-icons/fa";

const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";

const Hero = ({ movie, trailer, playing, setPlaying }) => (
  <section
    className="relative min-h-[80vh] bg-cover bg-center text-white transition-opacity duration-500"
    style={{
      backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(${BACKDROP_PATH}${movie.backdrop_path})`,
    }}>
    {playing ? (
      <>
        <Youtube
          videoId={trailer.key}
          className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"
          containerClassName="w-full h-full"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              controls: 0,
              cc_load_policy: 0,
              fs: 0,
              iv_load_policy: 0,
              modestbranding: 0,
              rel: 0,
              showinfo: 0,
            },
          }}
        />
        <button
          onClick={() => setPlaying(false)}
          className="inline-flex gap-2 absolute top-0 right-0 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition items-center justify-center">
          <FaTimes />
          <span>Close</span>
        </button>
      </>
    ) : (
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 bg-dark bg-opacity-50">
        {trailer ? (
          <button
            className="mb-6 inline-flex items-center justify-center gap-2 p-2 rounded-lg text-base bg-green-600 text-white shadow-lg transition-transform transform hover:scale-110"
            onClick={() => setPlaying(true)}
            type="button">
            <FaPlay />
            <span>Play Trailer</span>
          </button>
        ) : (
          <p className="text-lg text-gray-300">Sorry, no trailer available</p>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
        <p className="text-lg md:text-xl leading-relaxed max-w-[90%]">{movie.overview}</p>
      </div>
    )}
  </section>
);

export default Hero;
