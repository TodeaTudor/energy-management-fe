import {useHistory} from "react-router-dom";
import {Container, Nav, Navbar, Toast, ToastContainer} from "react-bootstrap";
import SockJsClient from "react-stomp";
import {useState} from "react";


const ClientNavbar = () => {
    const history = useHistory();
    const [messages, setMessages] = useState([]);

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    const onMessageReceived = (msg) => {
        if (messages.length === 2) {
            let replaced = [msg, ...messages]
            replaced.pop()
            setMessages(replaced);
        }else {
            setMessages(messages => [msg, ...messages]);
        }

    }

    const removeFromList = (index) => {
        let replaced = [...messages];
        replaced.splice(index, 1)
        setMessages(replaced)
    }

    const parseDate = (date) => {
        return (
            <strong>{date.split('T')[0]} </strong>
        )
    }

    const parseHour = (date) => {
        return (

            <strong>{date.split('T')[1].split('.')[0]} </strong>
        )
    }
    return (

        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand onClick={() => history.push('/client')}>eHome</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => history.push('/client/profile')}>Profile</Nav.Link>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <SockJsClient
                url={'http://localhost:8080/ws-message'}
                topics={['/user/' + localStorage.getItem('username') + '/topic/message']}
                onConnect={() => console.log("Connected")}
                onDisconnect={() => console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
            <ToastContainer position="top-start" className="p-3" style={{marginTop: "5%"}}>
                {messages.map((msg, index) => {
                    return (
                        <Toast bg={'danger'} key={index} animation={true} onClose={() => removeFromList(index)}>
                            <Toast.Header>
                                <strong className="me-auto">Device Malfunction</strong>
                            </Toast.Header>
                            <Toast.Body>
                                Power peak detected for device <strong>{msg.deviceName}</strong>.
                                The peak size was <strong>{msg.peakSize} W</strong> on {parseDate(msg.peakDate)} at {parseHour(msg.peakDate)}
                            </Toast.Body>
                        </Toast>
                    )
                })}

            </ToastContainer>
        </div>
    );
}

export default ClientNavbar;