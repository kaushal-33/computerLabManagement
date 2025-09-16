import { useContext, useState } from "react";
import { Button, ButtonToolbar, Form, Schema } from "rsuite";
import { LabContext } from "../context/LabProvider";
import { useNavigate } from "react-router-dom";

const { StringType } = Schema.Types;

const model = Schema.Model({
    labName: StringType().isRequired("Lab Name is required."),
    labLocation: StringType().isRequired("Please enter Lab's location."),
    labCapacity: StringType()
        .isRequired("Please enter Lab's capacity.")
        .addRule(value => {
            const num = Number(value);
            return !isNaN(num) && num >= 1;
        }, 'Lab capacity should be at least 1')
});
const AddLab = () => {
    const [input, setInput] = useState({ labName: "", labLocation: "", labCapacity: "" });
    const navigate = useNavigate();
    const { addLab } = useContext(LabContext);

    const handleChange = (formValue) => {
        setInput(formValue);
    };
    console.log(input)
    const handleSubmit = async () => {
        await addLab(input);
        navigate("/all-labs");
    };
    return (
        <div className="flex justify-center items-center h-full">
            <Form model={model} formValue={input} onChange={handleChange} onSubmit={handleSubmit}>
                <Form.Group controlId="labName">
                    <Form.ControlLabel>Lab Name</Form.ControlLabel>
                    <Form.Control name="labName" type="text" />
                </Form.Group>
                <Form.Group controlId="labLocation">
                    <Form.ControlLabel>Location</Form.ControlLabel>
                    <Form.Control name="labLocation" type="text" />
                </Form.Group>
                <Form.Group controlId="labCapacity">
                    <Form.ControlLabel>Lab Capacity</Form.ControlLabel>
                    <Form.Control name="labCapacity" type="number" />
                </Form.Group>
                <ButtonToolbar>
                    <Button appearance="primary" type="submit">
                        Submit
                    </Button>
                </ButtonToolbar>
            </Form>
        </div>
    )
}

export default AddLab