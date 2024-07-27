import React, { useEffect, useState } from "react";
import { FaTv } from "react-icons/fa";

const Header = ({ setSearchKey, fetchMovies }) => {
  const [debouncedSearchKey, setDebouncedSearchKey] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchKey(debouncedSearchKey);
      fetchMovies(debouncedSearchKey);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchKey, setSearchKey, fetchMovies]);

  return (
    <header className="py-3 bg-dark text-white shadow-md">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-center px-4">
        <a
          href="/"
          className="text-white flex items-center justify-center gap-2 text-3xl font-bold"
        >
          <span>
            <FaTv className="text-[#ff5722] max-[320px]:text-xl text-4xl" />
          </span>
          <h1 className="bg-gradient-to-r from-[#ff5722] via-green-500 to-indigo-400 text-transparent bg-clip-text">
            TrailerFlix
          </h1>
        </a>
        <form className="w-full md:w-auto flex items-center">
          <input
            type="text"
            placeholder="Search for movies"
            className="w-full md:w-80 p-3 border border-gray-600 bg-gray-800 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ff5722] transition duration-300 ease-in-out"
            onChange={(e) => setDebouncedSearchKey(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
