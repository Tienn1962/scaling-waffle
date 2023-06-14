import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <main>
    <h1>
      Welcome to the Coolest Recipes<sup>tm</sup> on the Internet!
    </h1>
    <Link
      to="/recipes"
      className="btn btn-lg custom-button"
      role="button"
    >
      View Recipes
    </Link>
  </main>
);
