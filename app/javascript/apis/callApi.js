import baseApi from "./baseApi";

const callApi = {
    create: () => {
        return baseApi.post('/calls', {});
    },
    broadcast: (creatorId, callingCode, data) => {
        baseApi.post(`/calls/${creatorId}/join/${callingCode}`, data);
    },
    checkCallingUrl: (creatorId, callingCode) => {
        return baseApi.get(`/calls/${creatorId}/join/${callingCode}`)
    }
}

export default callApi;
