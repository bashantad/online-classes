import React from "react";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";

import CourseList from "./courses/CourseList";
import HomeHero from "./courses/HomeHero";

const Home = () =>
    <div className="main-root">
        <main className='main-content-react'>
            <HomeHero/>
            <CourseList />
        </main>
    </div>

Home.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Home);
