import {HOST} from "../commons/api/host";
import performRequest from "../commons/api/rest-client";

const endpoints = {
    authenticate: '/authenticate',
    register: '/register'
}


const authenticate = (user, callback) => {
    let request = new Request(HOST.backend_api + endpoints.authenticate, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    performRequest(request, callback);
}

const register = (user, callback) => {
    let request = new Request(HOST.backend_api + endpoints.register, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    performRequest(request, callback);
}

export {
    authenticate,
    register
}