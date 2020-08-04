import React, {lazy} from "react";
import {Route} from "react-router";
const LandingPages = lazy(() => import("../components/landing/LandingPages"));
const EngineeringManagerLandingPage = lazy(() => import("../components/landing/EngineeringManager"));
const TeachingEngineeringManagerLandingPage = lazy(() => import("../components/landing/TeachingEngineeringManager"));
const SoftwareEngineerLandingPage = lazy(() => import("../components/landing/SoftwareEngineer"));
const TeachingSoftwareEngineerLandingPage = lazy(() => import("../components/landing/TeachingSoftwareEngineer"));

const landingRoutes = (
    <>
        {
            process.env.NODE_ENV === "development" && <Route path="/landings" exact component={LandingPages} />
        }
        <Route path="/become-a-software-engineer" exact component={SoftwareEngineerLandingPage}/>
        <Route path="/teach-software-engineering-course" exact component={TeachingSoftwareEngineerLandingPage}/>
        <Route path="/become-a-software-engineering-manager" exact component={EngineeringManagerLandingPage}/>
        <Route path="/teach-software-engineering-manager-course" exact component={TeachingEngineeringManagerLandingPage}/>
    </>
);
export default landingRoutes;
