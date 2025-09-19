import { useContext, useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Schema } from "rsuite";
import { LabContext } from "../context/LabProvider";
import { useNavigate, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/fireBase";

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
    labName: StringType().isRequired("Lab Name is required."),
    labLocation: StringType().isRequired("Please enter Lab's location."),
    labCapacity: NumberType()
        .isRequired("Please enter Lab's capacity.")
        .addRule(value => {
            const num = Number(value);
            return !isNaN(num) && num >= 1;
        }, 'Lab capacity should be at least 1')
});
const AddLab = () => {
    const [input, setInput] = useState({ labName: "", labLocation: "", labCapacity: "" });
    const navigate = useNavigate();
    const { labId } = useParams();
    const { addLab, updateLab } = useContext(LabContext);
    useEffect(() => {
        if (!labId) return;

        try {
            const unSub = onSnapshot(doc(db, "labs", labId), (doc) => {
                if (doc.exists()) {
                    setInput(doc.data());
                } else {
                    console.log("No such document!");
                }
            });

            return () => unSub();
        } catch (error) {
            console.error(error);
        }
    }, [labId])
    const handleChange = (formValue) => {
        setInput(formValue);
    };

    const handleSubmit = async () => {
        if (labId === undefined) { await addLab(input) }
        else {
            await updateLab(labId, input)
        };
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
                <Form.Group controlId="labCapacity" >
                    <Form.ControlLabel>Lab Capacity</Form.ControlLabel>
                    <Form.Control name="labCapacity" type="number" disabled={labId ? true : false} />
                </Form.Group>
                <ButtonToolbar>
                    <Button appearance="primary" type="submit">
                        {labId ? "Update" : "Add"}
                    </Button>
                </ButtonToolbar>
            </Form>
        </div>
    )
}

export default AddLab