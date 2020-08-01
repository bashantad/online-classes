import React from "react";
import {Link} from "react-router-dom";

const LandingPages = () => (
    <ul>
        <li>
            <Link to="/">
                Home
            </Link>
        </li>
        <li>
            <Link to="/become-a-software-engineer">
                Software engineer
            </Link>
        </li>
        <li>
            <Link to="/teach-software-engineering-course">
                Teach Software Engineer
            </Link>
        </li>
        <li>
            <Link to="/become-a-software-engineering-manager">
                Engineering Manager
            </Link>
        </li>
        <li>
            <Link to="/teach-software-engineering-manager-course">
                Teach Engineering Manager Course
            </Link>
        </li>
    </ul>
);

export default LandingPages;
