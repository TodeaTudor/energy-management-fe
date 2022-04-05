import React, {useState} from 'react'
import {Button, Form} from "react-bootstrap";
import {authenticate} from "./authentication-api";
import {Link, useHistory} from "react-router-dom";

const credentials = {
    username: "",
    password: ""
}

const Login = () => {
    const history = useHistory();
    const [formData, updateFormData] = useState(credentials)

    const handleInputChange = (event) => {
        updateFormData({
            ...formData, [event.target.name]: event.target.value
        })
    }

    const submitLoginData = () => {
        return authenticate(formData, (result, status, err) => {
            if (result !== null && (status === 200)) {
                localStorage.setItem('token', result[1]);
                localStorage.setItem('role', result[0]);
                history.push("/")
            } else if (status === 401) {
                alert("Invalid credentials");
            } else {
                alert("The API might be down");
            }
        });
    }

    return (
        <Form style={styles.formStyle}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label style={styles.labelStyle}>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" name="username" onChange={handleInputChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={styles.labelStyle}>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={handleInputChange}/>
            </Form.Group>
            <Link to="/register">Are you an admin without an account? Register here.</Link>
            <br/>
            <Button variant="primary" type="button" onClick={submitLoginData}>
                Submit
            </Button>
        </Form>

    );


}
const styles = {
    formStyle: {
        width: "40%",
        marginLeft: "30%",
        marginTop: 50
    },

    labelStyle: {
        float: "left"
    }

}

export default Login;
