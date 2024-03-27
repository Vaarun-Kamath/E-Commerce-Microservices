"use client";

import React, { useState } from "react";
import StyledLink from "./atoms/StyledLink";

function Sidebar() {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <nav className="fixed top-0 z-50 flex items-center justify-between h-12 w-full px-3 py-1.5 bg-green-500 border-b border-green-400 max-w-screen lg:px-5 lg:pl-3">
      {loading ? null : (
        <div className="fade-in-1 flex flex-row  justify-between w-full">
          <StyledLink
            href={"/home"}
            className="relative flex items-center text-sm justify-between font-medium text-gray-100 transition-all duration-200 sm:ml-2 hover:text-white"
          >
            E-Commerce Website
          </StyledLink>
          <StyledLink
            href={"#"}
            className="relative flex items-center text-sm justify-between font-medium text-green-400 transition-all duration-200 sm:ml-2 hover:text-green-700 py-2 px-7 bg-white rounded-full"
          >
            Username
          </StyledLink>
        </div>
      )}
    </nav>
  );
}

export default Sidebar;
