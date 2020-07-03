import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import Skeleton from "@material-ui/lab/Skeleton";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
    card: {
        width: 300,
        margin: '10px 20px'
    },
    media: {
        height: 250,
    },
}));

const CardSkeleton = () => {
    const classes = useStyles();
    return (
        <Fragment>
                <Card className={classes.card} id='card-home'>
                <Skeleton animation="wave" variant="rect" className={classes.media} />
                <CardContent>
                <Fragment>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
                </Fragment>
                </CardContent>
                </Card>
        </Fragment>
    );
};

export default CardSkeleton;