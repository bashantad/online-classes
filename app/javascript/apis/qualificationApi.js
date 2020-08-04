import baseApi from './baseApi';

const qualificationApi = {
    getAll: () => {
        return baseApi.get('/qualifications');
    },
    create: (data) => {
        return baseApi.post('/qualifications', data);
    },
    update: (qualificationId, data) => {
    	return baseApi.put(`/qualifications/${qualificationId}`, data);
    },
    delete: (qualificationId) => {
        return baseApi.delete(`/qualifications/${qualificationId}`);
    },
}

export default qualificationApi;
