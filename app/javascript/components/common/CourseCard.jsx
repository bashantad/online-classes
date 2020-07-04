import React from 'react';
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const CourseCard = ({courses, handleEnroll, handleDetails}) => {
    return (
        <div className="course-cards">
            {
                courses.map(course => (
                    <Card className='course-card-item' key={course.id}>
                        <div onClick={() => handleDetails(course.id)}>
                            <CardActionArea src={course.website}>
                                <div className='course-card-info'>For {course.course_for}</div>
                                <CardMedia
                                    className='course-media'
                                    image='https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'
                                    title={course.title}
                                    src={course.website}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {course.title}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom color="textSecondary" component="p">
                                        {course.body}
                                    </Typography>
                                    <Typography variant="subtitle1" component="p">
                                        Price: $ {course.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </div>
                        <div className="rating">
                            <Rating name="half-rating" defaultValue={course.rating} precision={0.5}/>
                        </div>

                        <CardActions className='card-actions'>
                            <Button size="small" color="primary" onClick={() => handleDetails(course.id)}>
                                Details
                            </Button>
                            <Button size="small" color="primary" onClick={() => handleEnroll(course.id)}>
                                Enroll
                            </Button>
                        </CardActions>
                    </Card>
                ))
            }
        </div>
    );
};

CourseCard.propTypes = {
    courses: PropTypes.array.isRequired,
    handleEnroll: PropTypes.func.isRequired,
    handleDetails: PropTypes.func.isRequired,
};

export default CourseCard;
