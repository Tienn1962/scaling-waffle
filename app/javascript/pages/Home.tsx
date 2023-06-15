import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <main className="flex flex-col items-center justify-center h-screen">
    <h1 className="p-4 text-3xl font-bold">Welcome to Scaling Waffle</h1>
    <Link
      to="/recipes"
      className="btn btn-lg"
      role="button"
    >
      View Recipes
    </Link>
  </main>
);
