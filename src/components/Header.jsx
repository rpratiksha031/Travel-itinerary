import React from "react";

const Header = () => {
  return (
    <div className="place-items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        <h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">
          Vigo<span className="text-yellow-300">-Via</span>
        </h1>
      </div>
    </div>
  );
};

export default Header;
