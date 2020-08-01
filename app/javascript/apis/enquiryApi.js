import baseApi from './baseApi';

const enquiryApi = {
    submit: (body) => {
        const data = {enquiry: body};
        return baseApi.post('/enquiries', data);
    }
}

export default enquiryApi;
