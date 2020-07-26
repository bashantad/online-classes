import baseApi from './baseApi';

const assignmentApi = {
    findOrCreateSubmission: (courseId, chapterId, assignmentId) => {
        return baseApi.get(`/courses/${courseId}/chapters/${chapterId}/assignment_submissions/find_or_create?assignment_id=${assignmentId}`);
    },
    updateSubmission: (courseId, chapterId, assignmentId, submissionId, body) => {
        const data = {assignment_submission: body};
        return baseApi.put(`/courses/${courseId}/chapters/${chapterId}/assignment_submissions/${submissionId}?assignment_id=${assignmentId}`, data);
    }
}

export default assignmentApi;
