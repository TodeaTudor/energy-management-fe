import {useState} from "react";
import Validate from "../../commons/validators/general-validator";
import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {updateDevice} from "../apis/devices-api";
import {useHistory} from "react-router-dom";


const UpdateDeviceForm = (props) => {
    const formControlsInit = {
        description: {
            value: props.device.description,
            placeholder: 'Device Description',
            valid: true,
            touched: false,
            validationRules: {
                minLength: 3,
                isRequired: true
            }

        },
        location: {
            value: props.device.location,
            placeholder: 'Device Location',
            valid: true,
            touched: false,
            validationRules: {
                minLength: 3,
                isRequired: true
            }

        },
        maximumEnergyConsumption: {
            value: props.device.maximumEnergyConsumption,
            placeholder: 'Maximum Energy Consumption',
            valid: true,
            touched: false,
            validationRules: {
                isRequired: true
            }

        },
        averageEnergyConsumption: {
            value: props.device.averageEnergyConsumption,
            placeholder: 'Average Energy Consumption',
            valid: true,
            touched: false,
            validationRules: {
                isRequired: true
            }

        },

    };
    const [formIsValid, setFormIsValid] = useState(false);
    const [formControls, setFormControls] = useState(formControlsInit);
    const history = useHistory();

    const editDevice = (device) => {
        updateDevice(device, ((result, status, error) => {
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
            id: props.device.id,
            description: formControls.description.value,
            location: formControls.location.value,
            maximumEnergyConsumption: formControls.maximumEnergyConsumption.value,
            averageEnergyConsumption: formControls.averageEnergyConsumption.value,
            sensorName: props.device.sensorName,
            sensorDescription: props.device.sensorDescription,
            sensorMaximumValue: props.device.sensorMaximumValue,
        };
        console.log(device)
        editDevice(device)

    }

    return (
        <div>
            <Form>
                <FormGroup id='description'>
                    <Form.Label for='description'> Description: </Form.Label>
                    <FormControl type="text" name="description"
                                 placeholder={formControls.description.placeholder}
                                 onChange={handleChange}
                                 defaultValue={props.device.description}
                                 touched={formControls.description.touched ? 1 : 0}
                                 valid={formControls.description.valid}
                                 required
                    />
                    {formControls.description.touched && !formControls.description.valid &&
                    <div className={"error-message row"}> * Description must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='location'>
                    <Form.Label for='location'> Location: </Form.Label>
                    <FormControl name='location' id='location'
                                 placeholder={formControls.location.placeholder}
                                 onChange={handleChange}
                                 defaultValue={props.device.location}
                                 touched={formControls.location.touched ? 1 : 0}
                                 valid={formControls.location.valid}
                                 required
                    />
                    {formControls.location.touched && !formControls.location.valid &&
                    <div className={"error-message row"}> * Location must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='maximumEnergyConsumption'>
                    <Form.Label for='maximumEnergyConsumption'> Maximum Energy Consumption: </Form.Label>
                    <FormControl type="number" name='maximumEnergyConsumption' id='maximumEnergyConsumption'
                                 placeholder={formControls.maximumEnergyConsumption.placeholder}
                                 onChange={handleChange}
                                 defaultValue={props.device.maximumEnergyConsumption}
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
                                 defaultValue={props.device.averageEnergyConsumption}
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

export default UpdateDeviceForm;