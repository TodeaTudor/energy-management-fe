import {HOST} from "../../commons/api/host";
import performRequest from "../../commons/api/rest-client";

const endpoints = {
    getClients: '/clients/all',
    deleteClient: '/clients',
    addClient: '/clients',
    updateClient: '/clients'
}


const getClients = (callback) => {
    let request = new Request(HOST.backend_api + endpoints.getClients, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    performRequest(request, callback);
}

const createClient = (client, callback) => {
    let request = new Request(HOST.backend_api + endpoints.addClient, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(client),
    });
    performRequest(request, callback);
}

const deleteClient = (client, callback) => {
    let request = new Request(HOST.backend_api + endpoints.deleteClient + '/' + String(client.id), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    performRequest(request, callback);
}

const updateClient = (client, callback) => {
    console.log(client)
    let request = new Request(HOST.backend_api + endpoints.updateClient, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(client),
    });
    performRequest(request, callback);
}

const assignDevice = (clientId, deviceId, callback) => {
    let request = new Request(HOST.backend_api + endpoints.updateClient + '/' + String(clientId) + '/' + String(deviceId), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    performRequest(request, callback);
}
export {
    getClients,
    createClient,
    deleteClient,
    updateClient,
    assignDevice
}