import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import Recipe from "../pages/Recipe";

const NotFound = () => {
  return (
    <main className="m-60 flex flex-col items-center justify-center">
      <p className="mb-5 text-2xl">This page does not exist</p>
      <Link
        to="/"
        className="btn bg-black"
      >
        Back
      </Link>
    </main>
  );
};

export default (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="recipes"
        element={<Recipes />}
      />
      <Route
        path="recipes/:id"
        element={<Recipe />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  </BrowserRouter>
);
