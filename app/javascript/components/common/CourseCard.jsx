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

const CourseCard = (props) => {
    const {courses} = props;
    console.log(courses)

    return (
        <div className="course-cards">
            {courses.map(card => (
                <Card className='course-card-item' key={card.id}>
                    <a href={card.website}>
                        <CardActionArea src={card.website}>
                            <div className='course-card-info'>For {card.course_for}</div>
                            <CardMedia
                                className='course-media'
                                image={card.cover}
                                title={card.title}
                                src={card.website}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" gutterBottom color="textSecondary" component="p">
                                    {card.body}
                                </Typography>
                                <Typography variant="subtitle1" component="p">
                                    Price: $ {card.price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </a>
                    <div className="rating">
                        <Rating name="half-rating" defaultValue={card.rating} precision={0.5}/>
                    </div>

                    <CardActions className='card-actions'>
                        <Button size="small" color="primary">
                            Call
                        </Button>
                        <Button size="small" color="primary">
                            Messages
                        </Button>
                        <Button size="small" color="primary">
                            Video
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};

CourseCard.propTypes = {
    courses: PropTypes.array.isRequired,
};

export default CourseCard;