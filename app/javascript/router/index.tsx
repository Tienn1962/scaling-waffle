import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import Recipe from "../pages/Recipe";

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
    </Routes>
  </BrowserRouter>
);
