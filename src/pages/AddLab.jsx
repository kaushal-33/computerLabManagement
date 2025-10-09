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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-center text-blue-700 tracking-tight">
                        {labId ? "Update Lab" : "Add New Lab"}
                    </h2>
                    <p className="text-gray-500 text-center text-sm">
                        Enter lab details below
                    </p>
                </div>
                <Form
                    model={model}
                    formValue={input}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    fluid
                    className="space-y-6"
                >
                    <Form.Group controlId="labName">
                        <Form.ControlLabel className="font-medium text-gray-600 mb-1">
                            Lab Name
                        </Form.ControlLabel>
                        <Form.Control
                            name="labName"
                            type="text"
                            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter lab name"
                        />
                    </Form.Group>
                    <Form.Group controlId="labLocation">
                        <Form.ControlLabel className="font-medium text-gray-600 mb-1">
                            Location
                        </Form.ControlLabel>
                        <Form.Control
                            name="labLocation"
                            type="text"
                            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter lab location"
                        />
                    </Form.Group>
                    <Form.Group controlId="labCapacity">
                        <Form.ControlLabel className="font-medium text-gray-600 mb-1">
                            Lab Capacity
                        </Form.ControlLabel>
                        <Form.Control
                            name="labCapacity"
                            type="number"
                            disabled={labId ? true : false}
                            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300"
                            placeholder="Lab maximum capacity"
                            min={1}
                        />
                    </Form.Group>
                    <ButtonToolbar className="flex justify-end gap-3 pt-4">
                        <Button appearance="primary" type="submit">
                            {labId ? "Update" : "Add"}
                        </Button>
                        <Button appearance="ghost" onClick={() => navigate("/all-labs")}>
                            Cancel
                        </Button>
                    </ButtonToolbar>
                </Form>
            </div>
        </div>
    );

}

export default AddLab