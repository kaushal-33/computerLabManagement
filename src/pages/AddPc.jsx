import { useContext, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Form, Schema, SelectPicker } from 'rsuite'
import { LabContext } from '../context/LabProvider';
import { PcContext } from '../context/PcProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/fireBase';
const { StringType } = Schema.Types;

const model = Schema.Model({
    pcName: StringType().isRequired("Pc Name is required."),
    labLocation: StringType().isRequired("Lab location is required."),
});

const AddPc = () => {
    const [input, setInput] = useState({ pcName: "", labLocation: "" });
    const navigate = useNavigate();
    const { pcId } = useParams();
    const { labs } = useContext(LabContext);
    const { addPc, updatePc } = useContext(PcContext);

    useEffect(() => {
        if (pcId !== undefined) {
            try {
                const unSub = onSnapshot(doc(db, "pcs", pcId), (doc) => {
                    if (doc.exists()) {
                        setInput(doc.data());
                    } else {
                        console.log("No such document!");
                    }
                })
                return () => unSub();
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    const handleChange = (formValue) => {
        setInput(formValue);
    };
    const labOptions = labs?.filter(lab => lab.availableCapacity > 0).map((lab) => { return { label: lab.labName, value: lab.labId } });
    const handleSubmit = async () => {
        if (pcId) {
            await updatePc(pcId, input);
        } else {
            await addPc(input);
        }
        navigate("/all-pcs");
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
                <h2 className="text-2xl font-semibold text-center text-blue-700 tracking-tight">
                    {pcId ? "Update PC" : "Add New PC"}
                </h2>
                <p className="text-gray-500 text-center mt-2 text-sm">
                    Enter PC details below
                </p>
                <Form
                    model={model}
                    formValue={input}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    fluid
                    className="space-y-6"
                >
                    <Form.Group controlId="pcName">
                        <Form.ControlLabel className="font-medium text-gray-600 mb-1">
                            PC Name
                        </Form.ControlLabel>
                        <Form.Control
                            name="pcName"
                            type="text"
                            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter PC name"
                        />
                    </Form.Group>
                    <Form.Group controlId="labLocation">
                        <Form.ControlLabel className="font-medium text-gray-600 mb-1">
                            Lab Location
                        </Form.ControlLabel>
                        <Form.Control
                            name="labLocation"
                            accepter={SelectPicker}
                            data={labOptions}
                            searchable={false}
                            renderMenuItem={(label) => (
                                <span className="capitalize">{label}</span>
                            )}
                            placeholder="Select a lab"
                            style={{ width: '100%' }}
                            className="rounded-lg border-gray-300"
                        />
                    </Form.Group>
                    <ButtonToolbar className="flex justify-end gap-3 pt-4">
                        <Button appearance="primary" type="submit">
                            {pcId ? "Update" : "Add"}
                        </Button>
                        <Button appearance="ghost" onClick={() => navigate("/all-pcs")}>
                            Cancel
                        </Button>
                    </ButtonToolbar>
                </Form>
            </div>
        </div>

    )
}

export default AddPc