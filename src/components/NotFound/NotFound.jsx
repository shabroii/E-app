import React from "react";
import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <div className="not-found bg-dark-500 text-secondary text-center">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to={"/"} className="home-link">
        Back to Home
      </Link>
   </div>
  );
}