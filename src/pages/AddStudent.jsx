import { useContext, useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Schema, SelectPicker } from "rsuite"
import { LabContext } from "../context/LabProvider";
import { PcContext } from "../context/PcProvider";
import { StudentContext } from "../context/StudentProvider";
import { useNavigate } from "react-router-dom";
const { StringType } = Schema.Types;

const model = Schema.Model({
    studentName: StringType().isRequired("Name is required."),
    labLocation: StringType().isRequired("Select Lab."),
    GRID: StringType().isRequired("GRID is required."),
    studentEmail: StringType().isRequired("email is required.").isEmail("Email is not valid."),
    assignedPc: StringType().isRequired("Select Pc."),
});

const AddStudent = () => {
    const [input, setInput] = useState({ studentName: "", labLocation: "", GRID: "", studentEmail: "", assignedPc: "" });
    const [pcOptions, setPcOptions] = useState([]);
    const navigate = useNavigate();
    const { labs } = useContext(LabContext);
    const { pcs } = useContext(PcContext);
    const { addStudent } = useContext(StudentContext);

    useEffect(() => {
        if (input.labLocation) {
            let filteredPc = pcs.filter((pc) => pc.labLocation === input.labLocation && pc.pcStatus === "available")
            setPcOptions(filteredPc.map((pc) => { return { label: pc.pcName, value: pc.pcId } }))
        }
    }, [input.labLocation])

    const handleChange = (formValue) => {
        setInput(formValue);
    };

    const labOptions = labs.map((lab) => { return { label: lab.labName, value: lab.labId } });
    const handleSubmit = async () => {
        console.log(input)
        try {
            await addStudent(input)
            navigate("/all-students");
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className="flex justify-center items-center h-full">
            <Form model={model} formValue={input} onChange={handleChange} onSubmit={handleSubmit}>
                <Form.Group controlId="studentName">
                    <Form.ControlLabel>Student Name</Form.ControlLabel>
                    <Form.Control name="studentName" type="text" />
                </Form.Group>
                <Form.Group controlId="GRID">
                    <Form.ControlLabel>Student GRID</Form.ControlLabel>
                    <Form.Control name="GRID" type="number" />
                </Form.Group>
                <Form.Group controlId="studentEmail">
                    <Form.ControlLabel>Student Email</Form.ControlLabel>
                    <Form.Control name="studentEmail" type="email" />
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
                <Form.Group controlId="assignedPc">
                    <Form.ControlLabel>PC</Form.ControlLabel>
                    <Form.Control
                        name="assignedPc"
                        accepter={SelectPicker}
                        data={pcOptions}
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
                        {false ? "Update" : "Add"}
                    </Button>
                </ButtonToolbar>
            </Form>
        </div>
    )
}

export default AddStudent