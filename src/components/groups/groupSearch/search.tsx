import React from "react";

const SearchInput = () => {
  return (
    <form className="w-full">
      <div className="relative">
        <input
          type="search"
          id="search"
          className="block w-full p-4 !pl-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="SEARCH"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-[#000] hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2"
        >
          ENTER
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
