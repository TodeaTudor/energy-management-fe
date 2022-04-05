import {useEffect, useState} from "react";
import Validate from "../../commons/validators/general-validator";
import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {createClient} from "../apis/clients-api";
import {useHistory} from "react-router-dom";

const formControlsInit = {
    dateOfBirth: {
        value: '',
        placeholder: 'Date of Birth: yyyy-mm-dd',
        valid: false,
        touched: false,
        validationRules: {
            dateValidator: true
        }
    },
    address: {
        value: '',
        placeholder: 'Address',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    name: {
        value: '',
        placeholder: 'Name',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    username: {
        value: '',
        placeholder: 'Username',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    password: {
        value: '',
        placeholder: 'Password',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
};


const ClientForm = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [formControls, setFormControls] = useState(formControlsInit);
    const history = useHistory();

    useEffect(() => {
        if (props.client.name !== '') {
            setFormIsValid(true);
        }
    }, []);

    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        let updatedControls = {...formControls};

        let updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = Validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        setFormControls(() => (updatedControls));
        setFormIsValid(() => (formIsValid));
    }

    function handleChangeUsername(event) {
        handleChange(event);
        if (event.target.name === "username") {
            if (props.clients.filter(client => client.username === event.target.value).length > 0) {
                setFormIsValid(false);
            }
        }
    }

    const submitClient = (client) => {
        createClient(client, ((result, status, err) => {
            if (result !== null && (status === 200)) {
                props.refresh();
                props.rerender();
            } else if (status === 401) {
                alert("Your session has expired, you will be redirected to the login page");
                localStorage.clear();
                history.push('/');
            } else if (status === 409) {
                alert("User already exists");
            }
        }));
    }

    function handleSubmit() {
        let person = {
            name: formControls.name.value,
            username: formControls.username.value,
            dateOfBirth: formControls.dateOfBirth.value,
            address: formControls.address.value,
            password: formControls.password.value
        };
        submitClient(person);

    }

    return (
        <div>
            <Form>
                <FormGroup id='name'>
                    <Form.Label for='nameField'> Name: </Form.Label>
                    <FormControl type="text" name="name" placeholder={formControls.name.placeholder}
                                 onChange={handleChange}
                                 defaultValue={props.client.name ? props.client.name : formControls.name.value}
                                 touched={formControls.name.touched ? 1 : 0}
                                 valid={formControls.name.valid}
                                 required
                    />
                    {formControls.name.touched && !formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='address'>
                    <Form.Label for='addressField'> Address: </Form.Label>
                    <FormControl name='address' id='addressField' placeholder={formControls.address.placeholder}
                                 onChange={handleChange}
                                 defaultValue={props.client.address ? props.client.address : formControls.address.value}
                                 touched={formControls.address.touched ? 1 : 0}
                                 valid={formControls.address.valid}
                                 required
                    />
                    {formControls.address.touched && !formControls.address.valid &&
                    <div className={"error-message row"}> * Address must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='Date of Birth'>
                    <Form.Label for='dobField'> Date of Birth: </Form.Label>
                    <FormControl name='dateOfBirth' id='dobField' placeholder={formControls.dateOfBirth.placeholder}
                                 onChange={handleChange}
                                 defaultValue={props.client.dateOfBirth ? props.client.dateOfBirth : formControls.dateOfBirth.value}
                                 touched={formControls.dateOfBirth.touched ? 1 : 0}
                                 valid={formControls.dateOfBirth.valid}
                                 required
                    />
                    {formControls.dateOfBirth.touched && !formControls.dateOfBirth.valid &&
                    <div className={"error-message row"}> * Date of birth must be a valid date of format
                        YYYY-MM-DD </div>}
                </FormGroup>

                <FormGroup id='Username'>
                    <Form.Label for='usernameField'> Username: </Form.Label>
                    <FormControl name='username' id='usernameField' placeholder={formControls.username.placeholder}
                                 onChange={handleChangeUsername}
                                 defaultValue={props.client.username ? props.client.username : formControls.username.value}
                                 touched={formControls.username.touched ? 1 : 0}
                                 valid={formControls.username.valid}
                                 required
                    />
                    {formControls.username.touched && !formControls.username.valid &&
                    <div className={"error-message row"}> * Username must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='Password'>
                    <Form.Label for='usernameField'> Password: </Form.Label>
                    <FormControl name='password' id='usernameField' placeholder={formControls.password.placeholder}
                                 onChange={handleChange}
                                 defaultValue={props.client.password ? props.client.password : formControls.password.value}
                                 touched={formControls.password.touched ? 1 : 0}
                                 valid={formControls.password.valid}
                                 required
                    />
                    {formControls.password.touched && !formControls.password.valid &&
                    <div className={"error-message row"}> * Password must have at least 3 characters </div>}
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 5}}>
                        <Button style={{marginTop: "10px"}} type={"button"} disabled={!formIsValid}
                                onClick={handleSubmit}> Submit </Button>
                    </Col>
                </Row>

            </Form>
        </div>
    );
}

export default ClientForm;