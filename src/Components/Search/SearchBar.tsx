import React from "react";

const SearchBar = () => {
  return (
    <div className="flex items-center">
      <div className="relative mt-2 rounded-md shadow-sm">
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div> */}
        <input
          type="text"
          name="price"
          id="price"
          className="block w-500 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset rounded-full ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:leading-6"
          placeholder="Search for a Wishlist..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
