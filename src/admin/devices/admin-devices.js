import AdminNavbar from "../admin-navbar";
import {useEffect, useState} from "react";
import {getClients} from "../apis/clients-api";
import {deleteDevice, getDevices} from "../apis/devices-api";
import {Table} from "react-bootstrap";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import DeviceForm from "./device-form";
import UpdateDeviceForm from "./device-update-form";
import SensorForm from "./sensor-form";
import UpdateSensorForm from "./sensor-update-form";
import AssignClient from "./assign-client";
import {useHistory} from "react-router-dom";

const DevicesComponent = () => {
    const [devices, setDevices] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [isSelectedUpdate, setIsSelectedUpdate] = useState(false);
    const [deviceToUpdate, setDeviceToUpdate] = useState({})
    const [isSelectedSensor, setIsSelectedSensor] = useState(false);
    const [isSelectedSensorUpdate, setIsSelectedSensorUpdate] = useState(false);
    const [isSelectedAddClient, setIsSelectedAddClient] = useState(false);
    const [clients, setClients] = useState([]);
    const history = useHistory();
    useEffect(() => {
        fetchDevices();
        fetchClients();
    }, []);

    const fetchDevices = () => {
        getDevices((result, status, err) => {
            if (result !== null && (status === 200)) {
                setDevices(result);
            } else if (status === 401) {
                alert("Your session has expired, you will be redirected to the login page");
                localStorage.clear();
                history.push('/');

            } else {
                //alert(err.message);
            }
        });
    }
    const fetchClients = () => {
        getClients((result, status, err) => {
            if (result !== null && (status === 200)) {
                setClients(result);
            } else if (status === 401) {
                alert("Your session has expired, you will be redirected to the login page");
                localStorage.clear();
                history.push('/');

            } else {
                //alert(err.message);
            }
        });
    }

    function toggleFormCreate() {
        setIsSelected((isSelected) => (!isSelected));
    }

    function toggleSensorFormCreate(device) {
        setIsSelectedSensor((isSelectedSensor) => (!isSelectedSensor));
        setDeviceToUpdate(device);
    }

    function toggleFormUpdate(device) {
        setIsSelectedUpdate((isSelectedUpdate) => (!isSelectedUpdate));
        setDeviceToUpdate(device);
    }

    function toggleSensorFormUpdate(device) {
        setIsSelectedSensorUpdate((isSelectedSensorUpdate) => (!isSelectedSensorUpdate));
        setDeviceToUpdate(device);
    }

    function toggleAddClient(device) {
        setIsSelectedAddClient((isSelectedAddClient) => (!isSelectedAddClient));
        setDeviceToUpdate(device);
    }

    const getSensorButton = (sensorName, device) => {
        if (sensorName == null) {
            return (<td>
                <button class="btn btn-primary" onClick={() => toggleSensorFormCreate(device)}>Add Sensor</button>
            </td>);
        } else {
            return (<td>
                <button class="btn btn-primary" onClick={() => toggleSensorFormUpdate(device)}>Edit Sensor</button>
            </td>);
        }
    }

    const getClientButton = (clientName, device) => {
        if (clientName == null) {
            return (<td>
                <button class="btn btn-primary" onClick={() => toggleAddClient(device)}>Add Client</button>
            </td>);
        }
    }

    const removeDevice = (device) => {
        deleteDevice(device, ((result, status, error) => {
            if (result !== null && (status === 200)) {
                console.log(result);
                fetchDevices();
            } else if (status === 401) {
                alert("Your session has expired, you will be redirected to the login page");
                localStorage.clear();
                history.push('/');

            } else {
                alert(error.message);
            }
        }));
    }

    const addTableBody = () => {
        return devices.map((device, index) => {
            const {
                id, averageEnergyConsumption, description, location, maximumEnergyConsumption, sensorDescription,
                sensorMaximumValue, sensorName, clientName
            } = device;
            return (
                <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{clientName}</td>
                    <td>{description}</td>
                    <td>{location}</td>
                    <td>{averageEnergyConsumption}</td>
                    <td>{sensorName}</td>
                    <td>
                        <button class="btn btn-primary" onClick={() => toggleFormUpdate(device)}>Edit Device</button>
                    </td>
                    <td>
                        <button class="btn btn-primary" type="submit" onClick={() => removeDevice(device)}>Delete
                            Device
                        </button>
                    </td>
                    {getSensorButton(sensorName, device)}
                    {getClientButton(clientName, device)}
                </tr>
            )
        })
    }

    return (
        <div>
            <AdminNavbar/>
            <button class="btn btn-primary" style={styles.createButton} onClick={toggleFormCreate}>Create Device
            </button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Client Name</th>
                    <th>Device Description</th>
                    <th>Device Location</th>
                    <th>Average Energy Consumption</th>
                    <th>Sensor Name</th>
                </tr>
                </thead>
                <tbody>
                {addTableBody()}
                </tbody>
            </Table>

            <Modal isOpen={isSelected} toggle={toggleFormCreate} size="lg">
                <ModalHeader toggle={toggleFormCreate}> Add Device: </ModalHeader>
                <ModalBody>
                    <DeviceForm rerender={fetchDevices} refresh={toggleFormCreate}/>
                </ModalBody>
            </Modal>

            <Modal isOpen={isSelectedUpdate} toggle={toggleFormUpdate} size="lg">
                <ModalHeader toggle={toggleFormUpdate}> Edit Device: </ModalHeader>
                <ModalBody>
                    <UpdateDeviceForm rerender={fetchDevices} refresh={() => setIsSelectedUpdate((isSelectedUpdate) => (!isSelectedUpdate))} device={deviceToUpdate}/>
                </ModalBody>
            </Modal>

            <Modal isOpen={isSelectedSensor} toggle={toggleSensorFormCreate} size="lg">
                <ModalHeader toggle={toggleSensorFormCreate}> Add Sensor: </ModalHeader>
                <ModalBody>
                    <SensorForm device={deviceToUpdate} rerender={fetchDevices} refresh={toggleSensorFormCreate}/>
                </ModalBody>
            </Modal>

            <Modal isOpen={isSelectedSensorUpdate} toggle={toggleSensorFormUpdate} size="lg">
                <ModalHeader toggle={toggleSensorFormUpdate}> Update Sensor: </ModalHeader>
                <ModalBody>
                    <UpdateSensorForm  device={deviceToUpdate} rerender={fetchDevices} refresh={() => setIsSelectedSensorUpdate((isSelectedSensorUpdate) => (!isSelectedSensorUpdate))}/>
                </ModalBody>
            </Modal>

            <Modal isOpen={isSelectedAddClient} toggle={toggleAddClient} size="lg">
                <ModalHeader toggle={toggleAddClient}> Assign Client: </ModalHeader>
                <ModalBody>
                    <AssignClient rerender={fetchDevices} refresh={toggleAddClient} clients={clients}
                                  device={deviceToUpdate}/>
                </ModalBody>
            </Modal>
        </div>

    );
}
const styles = {
    createButton: {
        margin: "10px",
        float: "left"
    }
}
export default DevicesComponent;