import ClientNavbar from "./client-navbar";
import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getDevicesOfClient} from "./apis/devices-api";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import ConsumptionHistory from "./consumption-history";
import {useHistory} from "react-router-dom";


const ClientDevices = (props) => {
    const [devices, setDevices] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState({});
    const history = useHistory();
    useEffect(() => {
        fetchDevices();
    }, [])

    const fetchDevices = () => {
        getDevicesOfClient((result, status, err) => {
            if (result !== null && (status === 200)) {
                setDevices(result);
            } else if (status === 401) {
                alert("Your session has expired, you will be redirected to the login page");
                localStorage.clear();
                history.push('/');
            } else {
                alert(err.message);
            }
        });
    }

    const toggleHistoricalConsumption = (device) => {
        setIsSelected((isSelected) => (!isSelected));
        setSelectedDevice(device);
    }

    const addTableBody = () => {
        return devices.map((device, index) => {
            const {
                id, averageEnergyConsumption, description, location, maximumEnergyConsumption, sensorName, consumption
            } = device;
            return (
                <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{description}</td>
                    <td>{location}</td>
                    <td>{averageEnergyConsumption}</td>
                    <td>{maximumEnergyConsumption}</td>
                    <td>{sensorName}</td>
                    <td>{consumption}</td>
                    {(consumption > 0) ? <td>
                        <button class="btn btn-primary" onClick={() => toggleHistoricalConsumption(device)}>View
                            Historical Consumption
                        </button>
                    </td> : <td></td>}
                </tr>
            )
        })
    }

    return (
        <div>
            <ClientNavbar/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Device Description</th>
                    <th>Device Location</th>
                    <th>Average Energy Consumption</th>
                    <th>Maximum Energy Consumption</th>
                    <th>Sensor Name</th>
                    <th>Total Consumption</th>
                </tr>
                </thead>
                <tbody>
                {addTableBody()}
                </tbody>
            </Table>
            <Modal isOpen={isSelected} toggle={toggleHistoricalConsumption} size="lg">
                <ModalHeader toggle={toggleHistoricalConsumption}> Consumption History: </ModalHeader>
                <ModalBody>
                    <ConsumptionHistory device={selectedDevice}/>
                </ModalBody>
            </Modal>

        </div>
    );
}

export default ClientDevices;