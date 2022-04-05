import {HOST} from "../../commons/api/host";
import performRequest from "../../commons/api/rest-client";

const endpoints = {
    devicesOfClient: "/devices/client",
    consumptionOfDevice: "/devices/consumption_history"

}

const getDevicesOfClient = (callback) => {
    let request = new Request(HOST.backend_api + endpoints.devicesOfClient + '/' + localStorage.getItem('token'), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    performRequest(request, callback);
}

const getConsumptionOfDevice = (deviceId, callback) => {
    let request = new Request(HOST.backend_api + endpoints.consumptionOfDevice + '/' + String(deviceId), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    performRequest(request, callback);
}

export {
    getDevicesOfClient,
    getConsumptionOfDevice
}