import React from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
const Home = () => (
    <div>
        <Header />
        <h1 className="display-4">Welcome to virtual classroom</h1>
        <p className="lead">
            Search the virtual classes that are running now.
        </p>
        <Link
            to="/classroom/1"
            className="btn btn-lg custom-button"
            role="button"
        >
            Join class
        </Link>
        <br />
        <Link
            to="/courses/1/messages"
            className="btn btn-lg custom-button"
            role="button"
        >
            Join Messages
        </Link>
        <br />
        <Link
            to="/calls/1"
            className="btn btn-lg custom-button"
            role="button"
        >
            Join Calls
        </Link>
  </div>
);

export default Home;
