import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <main className="flex flex-col items-center justify-center h-screen">
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center">
        Welcome to the Scaling Waffle
      </h1>
      <h2 className="mt-4 text-1xl text-center">
        The recipes that scale with your hunger
      </h2>
    </div>
    <Link
      to="/recipes"
      className="btn btn-lg"
      role="button"
    >
      View Recipes
    </Link>
  </main>
);
