import {useState} from "react";
import Validate from "../../commons/validators/general-validator";
import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {updateDevice} from "../apis/devices-api";
import {useHistory} from "react-router-dom";

const formControlsInit = {
    sensorName: {
        value: '',
        placeholder: 'Sensor Name',
        valid: false,
        touched: false,
        validationRules: {
            isRequired: true,
            minLength: 3
        }
    },
    sensorDescription: {
        value: '',
        placeholder: 'Sensor Description',
        valid: false,
        touched: false,
        validationRules: {
            isRequired: true,
            minLength: 3
        }
    },
    sensorMaximumValue: {
        value: '',
        placeholder: 'Sensor Maximum Value',
        valid: false,
        touched: false,
        validationRules: {
            isRequired: true,
        }
    },

};


const SensorForm = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [formControls, setFormControls] = useState(formControlsInit);
    const history = useHistory();

    const editDevice = (device) => {
        console.log(device)
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
            description: props.device.description,
            location: props.device.location,
            maximumEnergyConsumption: props.device.maximumEnergyConsumption,
            averageEnergyConsumption: props.device.averageEnergyConsumption,
            sensorName: formControls.sensorName.value,
            sensorDescription: formControls.sensorDescription.value,
            sensorMaximumValue: formControls.sensorMaximumValue.value
        };
        editDevice(device)

    }

    return (
        <div>
            <Form>
                <FormGroup id='sensorName'>
                    <Form.Label for='sensorName'> Name: </Form.Label>
                    <FormControl type="text" name="sensorName"
                                 placeholder={formControls.sensorName.placeholder}
                                 onChange={handleChange}
                                 defaultValue={formControls.sensorName.value}
                                 touched={formControls.sensorName.touched ? 1 : 0}
                                 valid={formControls.sensorName.valid}
                                 required
                    />
                    {formControls.sensorName.touched && !formControls.sensorName.valid &&
                    <div className={"error-message row"}> * Sensor name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='sensorDescription'>
                    <Form.Label for='sensorDescription'> Description: </Form.Label>
                    <FormControl name='sensorDescription' id='sensorDescription'
                                 placeholder={formControls.sensorDescription.placeholder}
                                 onChange={handleChange}
                                 defaultValue={formControls.sensorDescription.value}
                                 touched={formControls.sensorDescription.touched ? 1 : 0}
                                 valid={formControls.sensorDescription.valid}
                                 required
                    />
                    {formControls.sensorDescription.touched && !formControls.sensorDescription.valid &&
                    <div className={"error-message row"}> * Sensor description must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='sensorMaximumValue'>
                    <Form.Label for='sensorMaximumValue'> Sensor Maximum Value: </Form.Label>
                    <FormControl type="number" name='sensorMaximumValue' id='sensorMaximumValue'
                                 placeholder={formControls.sensorMaximumValue.placeholder}
                                 onChange={handleChange}
                                 defaultValue={formControls.sensorMaximumValue.value}
                                 touched={formControls.sensorMaximumValue.touched ? 1 : 0}
                                 valid={formControls.sensorMaximumValue.valid}
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

export default SensorForm;