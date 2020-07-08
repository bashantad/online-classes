import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Rating from '@material-ui/lab/Rating';

export default class NewReview extends React.Component {
    state = {
        rating: 0,
        comment: '',
    };

    handleCommentChange = (event) => {
        this.setState({comment: event.target.value})
    }

    handleRatingChange = (event, value) => {
        this.setState({rating: value})
    }

    submitReview = () => {
        const {rating, comment} = this.state;
        this.props.submitReview(rating, comment);
        this.setState({rating: 0, comment: ''});

    }

    render() {
        const {comment, rating} = this.state;
        return (
            <div className="comments">
                <Grid container>
                    <Grid item xs={12} sm={1} className='comment-avatar'>
                        <Avatar alt="Remy Sharp" src=""/>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <FormControl>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField id="standard-basic" label="Add Comment..." name='comment' multiline rows={4}
                                               onChange={this.handleCommentChange} value={comment}/>
                                </Grid>
                                <Grid item xs={12} className='rating'>
                                    <Typography variant="caption" gutterBottom className='rate-course'>
                                        Rate Course:
                                    </Typography>

                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={this.handleRatingChange}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            className='comment-send-btn'
                            startIcon={<SendIcon/>}
                            type="submit"
                            onClick={this.submitReview}>
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

NewReview.propTypes = {
    submitReview: PropTypes.func.isRequired,
};
