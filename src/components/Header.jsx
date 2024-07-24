import React from "react";

const Header = ({ setSearchKey }) => {
  return (
    <header className="py-4 bg-dark text-white shadow-md">
      <div className="flex flex-wrap md:justify-between items-center px-3 justify-center">
        <h1 className="text-3xl font-bold text-center my-6 text-green-400">Rewind</h1>
        <form className="flex justify-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search for movies"
            className="w-[300px] md:w-80 p-2 border border-white/20 bg-secondary rounded focus:outline-none"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
