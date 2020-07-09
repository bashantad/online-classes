import React from 'react';
import qualificationApi from '../../apis/qualificationApi';

export default class Qualification extends React.Component {
    state = {
        education: [],
        experiences: [],
        loading: true,
        errNotification: false,
        error: '',
    }

    componentDidMount() {
        qualificationApi.getAll()
            .then(res => res.json())
            .then(response => {
                const {experiences, education} = response;
                this.setState({experiences, education});
            }).catch(err => {
                this.setState({loading: false, errNotification: true, error: 'Something went wrong'});
            });
    }

    addQualification = (data) => {
        qualificationApi.create(data)
            .then(res => res.json())
            .then(response => {
                const updateObj = {};
                if(response.type === 'Education') {
                    updateObj.education = [response, ...updateObj.education];
                } else {
                    updateObj.experiences = [response, ...updateObj.experiences];
                }
                this.setState(updateObj);
            });
    }

    render() {
        const {error, errNotification, education, experiences, loading} = this.state;
        return (
            <>
                <h3>My education</h3>
                {JSON.stringify(education)}
                <h3>My Experience</h3>
                {JSON.stringify(experiences)}
            </>
        )
    }
}
