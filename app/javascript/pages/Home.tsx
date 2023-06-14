import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <main>
    <h1 className="text-3xl font-bold">
      Welcome to the Coolest Recipes<sup>tm</sup> on the Internet!
    </h1>
    <Link
      to="/recipes"
      className="button button-lg"
      role="button"
    >
      View Recipes
    </Link>
    <button className="button button-lg">I dont do anything!</button>
  </main>
);
