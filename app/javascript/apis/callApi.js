import baseApi from "./baseApi";

const callApi = {
    create: (body) => {
        return baseApi.post('/calls', body);
    },
    broadcast: (creatorId, callingCode, data) => {
        baseApi.post(`/calls/${creatorId}/join/${callingCode}`, data);
    },
    checkCallingUrl: (creatorId, callingCode) => {
        return baseApi.get(`/calls/${creatorId}/join/${callingCode}`)
    }
}

export default callApi;
