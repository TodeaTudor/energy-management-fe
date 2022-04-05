import {Button, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import React, {useState} from "react";
import {register} from "./authentication-api";

const credentials = {
    username: "",
    password: ""
}

const RegisterComponent = () => {
    const history = useHistory();
    const [formData, updateFormData] = useState(credentials)

    const handleInputChange = (event) => {
        updateFormData({
            ...formData, [event.target.name]: event.target.value
        })
    }

    const registerAdmin = () => {
        return register(formData, (result, status, err) => {
            if (result !== null && (status === 200)) {
                history.push("/login")
            } else if (status === 409) {
                alert("User already exists");
            } else {
                alert(err.message);
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

            <Button variant="primary" type="button" onClick={registerAdmin}>
                Register
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

export default RegisterComponent;
