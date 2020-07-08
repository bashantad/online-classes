import React, {Fragment} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

const ReviewList = (reviews) => {
    const classes = useStyles();
    return (
        <Fragment>
            {reviews.reviews.map((i,index) => (
                <div key={index}>
                    <Grid container className='comments'>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item sm={2} xs={12}>
                                    <Avatar alt={i.full_name} src={i.avatar_image_urls} className={classes.small}/>
                                    <Typography variant="body2" gutterBottom className='avatar-name'>
                                        {i.user.full_name}
                                    </Typography>
                                </Grid>
                                <Grid item sm={10} xs={12}>
                                    <Typography variant="body1" gutterBottom>
                                        {i.comment}
                                    </Typography>
                                    <div>
                                        <Rating
                                            name="read-only" value={i.rating} readOnly
                                        />
                                        <span className='comment-time'>
                                            <Typography variant="caption" display="block">{i.created_at}
                                            </Typography></span>
                                    </div>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider light />
                </div>
            ))}
        </Fragment>
    );
};

export default ReviewList;
