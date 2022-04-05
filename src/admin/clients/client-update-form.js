import {useState} from "react";
import Validate from "../../commons/validators/general-validator";
import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {updateClient} from "../apis/clients-api";
import {useHistory} from "react-router-dom";


const ClientFormUpdate = (props) => {
    const formControlsInit = {
        dateOfBirth: {
            value: props.client.dateOfBirth,
            placeholder: 'Date of Birth: yyyy-mm-dd',
            valid: true,
            touched: true,
            validationRules: {
                dateValidator: true
            }
        },
        address: {
            value: props.client.address,
            placeholder: 'Address',
            valid: true,
            touched: true,
            validationRules: {
                minLength: 3,
                isRequired: true
            }
        },
        name: {
            value: props.client.name,
            placeholder: 'Name',
            valid: true,
            touched: true,
            validationRules: {
                minLength: 3,
                isRequired: true
            }
        },
        username: {
            value: props.client.username,
            placeholder: 'Username',
            valid: true,
            touched: true,
            validationRules: {
                minLength: 3,
                isRequired: true
            }
        },
    };
    const [formIsValid, setFormIsValid] = useState(false);
    const [formControls, setFormControls] = useState(formControlsInit);
    const history = useHistory();

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

    const editClient = (client) => {
        updateClient(client, ((result, status, err) => {
            if (status === 200) {
                props.refresh();
                props.rerender();
            } else if (status === 401) {
                alert("Your session has expired, you will be redirected to the login page");
                localStorage.clear();
                history.push('/');

            } else {
                alert(err.message);
            }
        }))
    }

    function handleSubmit() {
        let person = {
            id: props.client.id,
            name: formControls.name.value,
            username: formControls.username.value,
            dateOfBirth: formControls.dateOfBirth.value,
            address: formControls.address.value,
            password: null
        };
        editClient(person);

    }

    return (
        <div>
            <Form>
                <FormGroup id='name'>
                    <Form.Label for='nameField'> Name: </Form.Label>
                    <FormControl type="text" name="name"
                                 onChange={handleChange}
                                 defaultValue={props.client.name}
                                 touched={formControls.name.touched ? 1 : 0}
                                 valid={formControls.name.valid}
                                 required
                    />
                    {formControls.name.touched && !formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='address'>
                    <Form.Label for='addressField'> Address: </Form.Label>
                    <FormControl name='address' id='addressField'
                                 onChange={handleChange}
                                 defaultValue={props.client.address}
                                 touched={formControls.address.touched ? 1 : 0}
                                 valid={formControls.address.valid}
                                 required
                    />
                    {formControls.address.touched && !formControls.address.valid &&
                    <div className={"error-message row"}> * Address must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='Date of Birth'>
                    <Form.Label for='dobField'> Date of Birth: </Form.Label>
                    <FormControl name='dateOfBirth' id='dobField'
                                 onChange={handleChange}
                                 defaultValue={props.client.dateOfBirth}
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
                    <FormControl name='username' id='usernameField'
                                 onChange={handleChangeUsername}
                                 defaultValue={props.client.username}
                                 touched={formControls.username.touched ? 1 : 0}
                                 valid={formControls.username.valid}
                                 required
                    />
                    {formControls.username.touched && !formControls.username.valid &&
                    <div className={"error-message row"}> * Username must have at least 3 characters </div>}
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

export default ClientFormUpdate;