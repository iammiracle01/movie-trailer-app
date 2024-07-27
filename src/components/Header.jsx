import React, { useEffect, useState } from "react";
import { FaTv, FaSearch } from "react-icons/fa";

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

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setSearchKey(debouncedSearchKey);
    fetchMovies(debouncedSearchKey);
  };

  return (
    <header className="py-3 bg-dark text-white shadow-md">
      <div className="flex flex-col gap-5 sm:flex-row justify-between items-center px-4">
      <a
          href="/"
          className="text-white flex items-center justify-center gap-3 text-4xl font-extrabold"
        >
          <FaTv className="text-[#ff5722] text-5xl" />
          <h1 className="bg-gradient-to-r from-[#ff5722] via-green-500 to-indigo-400 text-transparent bg-clip-text text-4xl">
            TrailerFlix
          </h1>
        </a>
        <form className="flex items-center w-full sm:w-auto" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for movies"
            className="w-full md:w-80 p-3 border border-white/60 bg-transparent text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#ff5722] transition duration-300 ease-in-out"
            onChange={(e) => setDebouncedSearchKey(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 p-3 bg-[#ff5722] rounded-full hover:bg-[#e64a19] transition duration-300 ease-in-out"
          >
            <FaSearch className="text-white text-2xl" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
