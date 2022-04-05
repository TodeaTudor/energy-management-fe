import {useHistory} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

const AdminNavbar = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand onClick={() => history.push('/admin')}>eHome</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => history.push('/admin/clients')}>Clients</Nav.Link>
                        <Nav.Link onClick={() => history.push('/admin/devices')}>Devices</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavbar;