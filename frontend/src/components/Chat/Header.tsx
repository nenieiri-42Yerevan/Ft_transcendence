import axios from "axios";
import React, { useState, useEffect } from "react";

const Header = () => {

    return (
        <div className=" my-3">
            <div className="relative text-white">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input type="search" className="block w-full py-2 pl-10 bg-[#262525] border border-[#D1D5DB] rounded outline-none" name="search"
                placeholder="Search" required />
            </div>
          </div>
    );
};

export default Header;