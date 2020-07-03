import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";
import Header from '../../components/Header';
import courseApi from "../../apis/courseApi";

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

        return (
            <div className="main-root">
                <Header/>
                <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                {JSON.stringify(course)}
                </div>
            </div>
        );
    }
}

CourseDetail.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(CourseDetail);
