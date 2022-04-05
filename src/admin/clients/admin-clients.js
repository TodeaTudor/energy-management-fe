import AdminNavbar from "../admin-navbar";
import {useEffect, useState} from "react";
import {deleteClient, getClients} from "../apis/clients-api";
import {Table} from "react-bootstrap";
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import ClientForm from "./client-form";
import ClientFormUpdate from "./client-update-form";
import {useHistory} from "react-router-dom";

const defaultPropsClient = {
    name: '',
    address: '',
    username: '',
    dateOfBirth: '',
    password: ''
}


const ClientsComponent = () => {
    const [clients, setClients] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [isSelectedUpdate, setIsSelectedUpdate] = useState(false);
    const [clientToUpdate, setClientToUpdate] = useState({})
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();
    useEffect(() => {
        fetchClients()
    }, []);

    const fetchClients = () => {
        getClients((result, status, err) => {
            if (result !== null && (status === 200)) {
                setClients(result);
                setIsLoaded(true);
            } else if (status === 401) {
                alert("Your session has expired, you will be redirected to the login page");
                localStorage.clear();
                history.push('/');

            } else {
                alert(err.message);
            }
        });
    }


    const removeClient = (client) => {
        deleteClient(client, ((result, status, err) => {
            if (status === 200) {
                fetchClients();
            } else if (status === 401) {
                alert("Your session has expired, you will be redirected to the login page");
                localStorage.clear();
                history.push('/');
            } else {
                alert(err.message);
            }
        }))
    }

    const addTableBody = () => {
        return clients.map((client, index) => {
            const {id, address, dateOfBirth, name, username} = client;
            return (
                <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{dateOfBirth}</td>
                    <td>{address}</td>
                    <td>{username}</td>
                    <td>
                        <button class="btn btn-primary" onClick={() => toggleFormUpdate(client)}>Edit</button>
                    </td>
                    <td>
                        <button class="btn btn-primary" type="submit" onClick={() => removeClient(client)}>Delete
                        </button>
                    </td>
                </tr>
            )
        })
    }

    function toggleFormCreate() {
        setIsSelected((isSelected) => (!isSelected));
    }

    function toggleFormUpdate(client) {
        setIsSelectedUpdate((isSelectedUpdate) => (!isSelectedUpdate));
        setClientToUpdate(client)
    }


    return (
        <div>
            <AdminNavbar/>
            <button class="btn btn-primary" style={styles.createButton} onClick={toggleFormCreate}>Create Client
            </button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                {addTableBody()}
                </tbody>
            </Table>

            <Modal isOpen={isSelected} toggle={toggleFormCreate} size="lg">
                <ModalHeader toggle={toggleFormCreate}> Add Person: </ModalHeader>
                <ModalBody>
                    <ClientForm rerender={fetchClients} refresh={toggleFormCreate} client={defaultPropsClient} clients={clients}/>
                </ModalBody>
            </Modal>

            <Modal isOpen={isSelectedUpdate} toggle={toggleFormUpdate} size="lg">
                <ModalHeader toggle={toggleFormUpdate}> Update Person: </ModalHeader>
                <ModalBody>
                    <ClientFormUpdate rerender={fetchClients} refresh={() => setIsSelectedUpdate((isSelectedUpdate) => (!isSelectedUpdate))} client={clientToUpdate} clients={clients}/>
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

export default ClientsComponent;