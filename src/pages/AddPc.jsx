import { useContext, useState } from 'react';
import { Button, ButtonToolbar, Form, Schema, SelectPicker } from 'rsuite'
import { LabContext } from '../context/LabProvider';
import { PcContext } from '../context/PcProvider';
import { useNavigate } from 'react-router-dom';
const { StringType } = Schema.Types;

const model = Schema.Model({
    pcName: StringType().isRequired("Pc Name is required."),
    labLocation: StringType().isRequired("Lab location is required."),
});

const AddPc = () => {
    const [input, setInput] = useState({ pcName: "", labLocation: "" });
    const navigate = useNavigate();
    const { labs } = useContext(LabContext);
    const { addPc } = useContext(PcContext);
    const handleChange = (formValue) => {
        setInput(formValue);
    };
    const labOptions = labs?.filter(lab => lab.availableCapacity > 0).map((lab) => { return { label: lab.labName, value: lab.labId } });
    console.log(labOptions);
    const handleSubmit = async () => {
        await addPc(input);
        navigate("/all-pcs");
    };
    return (
        <div className="flex justify-center items-center h-full">
            <Form model={model} formValue={input} onChange={handleChange} onSubmit={handleSubmit}>
                <Form.Group controlId="pcName">
                    <Form.ControlLabel>Pc Name</Form.ControlLabel>
                    <Form.Control name="pcName" type="text" />
                </Form.Group>
                <Form.Group controlId="labLocation">
                    <Form.ControlLabel>Lab Location</Form.ControlLabel>
                    <Form.Control
                        name="labLocation"
                        accepter={SelectPicker}
                        data={labOptions}
                        searchable={false}
                        renderMenuItem={(label) => (
                            <span className='capitalize'>{label}</span>
                        )}
                        placeholder="Select a lab"
                        style={{ width: '300px', textTransform: "capitalize" }}
                    />
                </Form.Group>
                <ButtonToolbar>
                    <Button appearance="primary" type="submit">
                        add
                    </Button>
                </ButtonToolbar>
            </Form>
        </div>
    )
}

export default AddPc