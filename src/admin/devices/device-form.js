import {useState} from "react";
import Validate from "../../commons/validators/general-validator";
import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {createDevice} from "../apis/devices-api";
import {useHistory} from "react-router-dom";

const formControlsInit = {
    description: {
        value: '',
        placeholder: 'Device Description',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    location: {
        value: '',
        placeholder: 'Device Location',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    maximumEnergyConsumption: {
        value: '',
        placeholder: 'Maximum Energy Consumption',
        valid: false,
        touched: false,
        validationRules: {
            isRequired: true
        }
    },
    averageEnergyConsumption: {
        value: '',
        placeholder: 'Average Energy Consumption',
        valid: false,
        touched: false,
        validationRules: {
            isRequired: true
        }
    },

};


const DeviceForm = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [formControls, setFormControls] = useState(formControlsInit);
    const history = useHistory();

    const addDevice = (device) => {
        createDevice(device, ((result, status, error) => {
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


    function handleSubmit() {
        let device = {
            description: formControls.description.value,
            location: formControls.location.value,
            maximumEnergyConsumption: formControls.maximumEnergyConsumption.value,
            averageEnergyConsumption: formControls.averageEnergyConsumption.value
        };
        addDevice(device)

    }

    return (
        <div>
            <Form>
                <FormGroup id='description'>
                    <Form.Label for='nameField'> Description: </Form.Label>
                    <FormControl type="text" name="description"
                                 placeholder={formControls.description.placeholder}
                                 onChange={handleChange}
                                 defaultValue={formControls.description.value}
                                 touched={formControls.description.touched ? 1 : 0}
                                 valid={formControls.description.valid}
                                 required
                    />
                    {formControls.description.touched && !formControls.description.valid &&
                    <div className={"error-message row"}> * Description must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='location'>
                    <Form.Label for='addressField'> Location: </Form.Label>
                    <FormControl name='location' id='addressField'
                                 placeholder={formControls.location.placeholder}
                                 onChange={handleChange}
                                 defaultValue={formControls.location.value}
                                 touched={formControls.location.touched ? 1 : 0}
                                 valid={formControls.location.valid}
                                 required
                    />
                    {formControls.location.touched && !formControls.location.valid &&
                    <div className={"error-message row"}> * Location must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='maximumEnergyConsumption'>
                    <Form.Label for='averageEnergyConsumption'> Maximum Energy Consumption: </Form.Label>
                    <FormControl type="number" name='maximumEnergyConsumption' id='maximumEnergyConsumption'
                                 placeholder={formControls.maximumEnergyConsumption.placeholder}
                                 onChange={handleChange}
                                 defaultValue={formControls.maximumEnergyConsumption.value}
                                 touched={formControls.maximumEnergyConsumption.touched ? 1 : 0}
                                 valid={formControls.maximumEnergyConsumption.valid}
                                 required
                    />
                </FormGroup>

                <FormGroup id='averageEnergyConsumption'>
                    <Form.Label for='averageEnergyConsumption'> Average Energy Consumption: </Form.Label>
                    <FormControl type="number" name='averageEnergyConsumption' id='averageEnergyConsumption'
                                 placeholder={formControls.averageEnergyConsumption.placeholder}
                                 onChange={handleChange}
                                 defaultValue={formControls.averageEnergyConsumption.value}
                                 touched={formControls.averageEnergyConsumption.touched ? 1 : 0}
                                 valid={formControls.averageEnergyConsumption.valid}
                                 required
                    />
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

export default DeviceForm;