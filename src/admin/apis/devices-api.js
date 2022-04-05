import {HOST} from "../../commons/api/host";
import performRequest from "../../commons/api/rest-client";

const endpoints = {
    getDevices: '/devices/all',
    deleteDevice: '/devices',
    addDevice: '/devices',
    updateDevice: '/devices'
}


const getDevices = (callback) => {
    let request = new Request(HOST.backend_api + endpoints.getDevices, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    performRequest(request, callback);
}

const createDevice = (device, callback) => {
    let request = new Request(HOST.backend_api + endpoints.addDevice, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(device),
    });
    performRequest(request, callback);
}

const deleteDevice = (device, callback) => {
    let request = new Request(HOST.backend_api + endpoints.deleteDevice + '/' + String(device.id), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    performRequest(request, callback);
}

const updateDevice = (device, callback) => {
    let request = new Request(HOST.backend_api + endpoints.updateDevice, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(device),
    });
    performRequest(request, callback);
}

export {
    getDevices,
    createDevice,
    deleteDevice,
    updateDevice
}