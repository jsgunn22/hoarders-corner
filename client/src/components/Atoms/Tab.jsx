import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Tab({ label, to }) {
  const currentPage = useLocation().pathname;

  return (
    <div
      className={`px-3  w-fit h-8 ${
        currentPage === to ? "text-pri-5 border-b-2 pt-0.5" : "text-neu-7"
      }`}
    >
      <Link className={`text-h4 font-bold h-full flex items-center`} to={to}>
        {label}
      </Link>
    </div>
  );
}
