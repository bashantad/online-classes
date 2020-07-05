import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";
import Header from '../../components/Header';
import courseApi from "../../apis/courseApi";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

export class CourseDetail extends React.Component {
    state = {
        course: null,
        loading: true,
    }

    _getCourseId = () => {
        return this.props.match.params.course_id;
    }

    componentDidMount() {
        courseApi.getById(this._getCourseId())
            .then(res => res.json())
            .then(response => {
                this.setState({course: response, loading: false});
            }).catch(err => {
            this.setState({loading: false, error: 'Something went wrong'});
        });
    }

    render() {
        const {course} = this.state;
        console.log(course)
        return (
            <div className="main-root">
                <Header/>
                <main className='main-content-react'>
                    <Toolbar></Toolbar>
                    <Paper className='course-detail-paper'>
                        <div className='course-cover'>
                            <img
                                src='https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'
                                alt=''/>
                            <div>
                                <Typography variant="h3" gutterBottom>
                                    {course && course.title}
                                </Typography>
                            </div>

                            <Grid container className='first-grid'>
                                <Grid item xs={12} sm={6} className='course-owner-details'>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <Avatar alt={course && course.owner.full_name}
                                                    src={course && course.owner.avatar_image_urls}/>
                                        </Grid>
                                        <Grid item xs={8} className='course-margin-top'>
                                            <Typography variant="body1" gutterBottom>
                                                {course && course.owner.full_name}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item xs={12} sm={5} className='price-box'>
                                    <Typography variant="h6" gutterBottom  className='course-margin-top'>
                                        Price: <span> ${course && course.price}</span>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Course For: <span>{course && course.course_for}</span>
                                    </Typography>
                                </Grid>
                            </Grid><Grid container>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Description: <span>{course && course.body}</span>
                                </Typography>
                            </Grid>
                        </Grid>
                            <Button variant="outlined" color="primary" href={course && course.website}>
                                More
                            </Button>
                        </div>
                    </Paper>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='svg-bottom'>
                        <path fill="#3F51B5" fillOpacity="1" d="M0,320L720,32L1440,160L1440,320L720,320L0,320Z"></path>
                    </svg>
                </main>
            </div>
        );
    }
}

CourseDetail.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(CourseDetail);
