import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
    <div>  
        <h1 className="display-4">Welcome to virtual classroom</h1>
        <p className="lead">
            Search the virtual classes that are running now.
        </p>
        <Link
            to="/calls/join"
            className="btn btn-lg custom-button"
            role="button"
        >
            Join class
        </Link>
  </div>
);

export default Home;
