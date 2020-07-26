import baseApi from './baseApi';

const assignmentApi = {
    findOrCreateSubmission: (courseId, chapterId, assignmentId) => {
        return baseApi.get(`/courses/${courseId}/chapters/${chapterId}/assignment_submissions/find_or_create?assignment_id=${assignmentId}`);
    },
    updateSubmission: (courseId, chapterId, assignmentId, submissionId, body) => {
        return baseApi.post(`/courses/${courseId}/chapters/${chapterId}/assignment_submissions/${submissionId}?assignment_id=${assignmentId}`, body);
    }
}

export default assignmentApi;
