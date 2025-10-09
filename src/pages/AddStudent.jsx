import { useContext, useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Schema, SelectPicker } from "rsuite"
import { LabContext } from "../context/LabProvider";
import { PcContext } from "../context/PcProvider";
import { StudentContext } from "../context/StudentProvider";
import { useNavigate, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/fireBase";
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
    const { studentId } = useParams();
    const { labs } = useContext(LabContext);
    const { pcs } = useContext(PcContext);
    const { addStudent, updateStudent } = useContext(StudentContext);


    useEffect(() => {
        if (studentId !== undefined) {
            try {
                const unSub = onSnapshot(doc(db, "students", studentId), (doc) => {
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

    useEffect(() => {
        if (input.labLocation) {
            let filteredPc = pcs.filter((pc) => pc.labLocation === input.labLocation && pc.pcStatus === "available")
            console.log(filteredPc)
            setPcOptions(filteredPc.map((pc) => { return { label: pc.pcName, value: pc.pcId } }))
        }
    }, [input.labLocation])

    const handleChange = (formValue) => {
        setInput(formValue);
    };

    const labOptions = labs.map((lab) => { return { label: lab.labName, value: lab.labId } });
    const handleSubmit = async () => {
        if (studentId) {
            try {
                await updateStudent(studentId, input)

            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await addStudent(input)
            } catch (error) {
                console.log(error)
            }
        }
        navigate("/all-students");
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="w-full max-w-xl p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
                <h2 className="text-2xl font-semibold text-center text-blue-700 mb-2">
                    {studentId ? "Update Student" : "Add New Student"}
                </h2>
                <p className="mb-6 text-gray-500 text-center">Enter student and assignment details below</p>
                <Form
                    model={model}
                    formValue={input}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    fluid
                    className="space-y-5"
                >
                    <Form.Group controlId="studentName">
                        <Form.ControlLabel className="font-medium text-gray-600 mb-1">
                            Student Name
                        </Form.ControlLabel>
                        <Form.Control
                            name="studentName"
                            type="text"
                            placeholder="Enter student name"
                            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300"
                        />
                    </Form.Group>

                    <Form.Group controlId="GRID">
                        <Form.ControlLabel className="font-medium text-gray-600 mb-1">
                            Student GRID
                        </Form.ControlLabel>
                        <Form.Control
                            name="GRID"
                            type="number"
                            placeholder="Enter GRID"
                            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300"
                        />
                    </Form.Group>

                    <Form.Group controlId="studentEmail">
                        <Form.ControlLabel className="font-medium text-gray-600 mb-1">
                            Student Email
                        </Form.ControlLabel>
                        <Form.Control
                            name="studentEmail"
                            type="email"
                            placeholder="Enter student email"
                            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300"
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
                                <span className='capitalize'>{label}</span>
                            )}
                            placeholder="Select a lab"
                            style={{ width: '100%' }}
                            className="rounded-lg border-gray-300"
                        />
                    </Form.Group>

                    <Form.Group controlId="assignedPc">
                        <Form.ControlLabel className="font-medium text-gray-600 mb-1">
                            PC
                        </Form.ControlLabel>
                        <Form.Control
                            name="assignedPc"
                            accepter={SelectPicker}
                            data={pcOptions}
                            searchable={false}
                            renderMenuItem={(label) => (
                                <span className='capitalize'>{label}</span>
                            )}
                            placeholder="Select a PC"
                            style={{ width: '100%' }}
                            className="rounded-lg border-gray-300"
                        />
                    </Form.Group>

                    <ButtonToolbar className="flex justify-end gap-3 pt-4">
                        <Button appearance="primary" type="submit">
                            {studentId ? "Update" : "Add"}
                        </Button>
                        <Button appearance="ghost" onClick={() => navigate("/all-students")}>
                            Cancel
                        </Button>
                    </ButtonToolbar>
                </Form>
            </div>
        </div>

    )
}

export default AddStudent