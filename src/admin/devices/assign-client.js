import {useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {assignDevice} from "../apis/clients-api";
import {useHistory} from "react-router-dom";

const AssignClient = (props) => {
    const [selectedClient, setSelectedClient] = useState({data: props.clients[0]});
    const history = useHistory();
    const generateDropdown = () => {
        return props.clients.map((client, index) => {
            const {id, name, username} = client;
            return (
                <option key={id} value={index}>
                    {name}, {username}
                </option>
            );
        });
    }

    const handleChange = (event) => {
        setSelectedClient({
            data: props.clients[event.target.value]
        });
    }

    const handleSubmit = () => {
        assignDevice(selectedClient.data.id, props.device.id, ((result, status, error) => {
            if (result !== null && (status === 200)) {
                props.refresh();
                props.rerender();
            } else if (status === 401) {
                alert("Your session has expired, you will be redirected to the login page");
                localStorage.clear();
                history.push('/');

            } else {
                alert(error.message);
            }
        }));
    }

    return (
        <div>
            <select onChange={handleChange}>
                {generateDropdown()}
            </select>
            <Row>
                <Col sm={{size: '4', offset: 5}}>
                    <Button style={{marginTop: "10px"}} type={"button"} onClick={handleSubmit}> Submit </Button>
                </Col>
            </Row>
        </div>
    );
}

export default AssignClient;