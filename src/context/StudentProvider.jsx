import { createContext, useContext, useEffect, useState } from "react"
import { LabContext } from "./LabProvider";
import { PcContext } from "./PcProvider";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/fireBase";
import { useNavigate } from "react-router-dom";

export const StudentContext = createContext();

const StudentProvider = ({ children }) => {
    // all students
    const [students, setStudents] = useState([]);

    const { fetchLabs } = useContext(LabContext);
    const { pcs, fetchPcs } = useContext(PcContext);
    useEffect(() => {
        fetchStudents();
    }, [])
    const addStudent = async (input) => {
        try {
            await addDoc(collection(db, "students"), { createdAt: new Date(), ...input });
            await updateDoc(doc(db, "pcs", input.assignedPc), { pcStatus: "assigned" });
            fetchStudents();
        } catch (error) {
            console.log(error)
        }
    }
    const fetchStudents = async () => {
        try {
            const { docs } = await getDocs(collection(db, "students"));
            const stuArr = docs?.map((stu) => { return { studentId: stu.id, ...stu.data() } })
            setStudents(stuArr);
            fetchPcs();
            fetchLabs();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <StudentContext.Provider value={{ addStudent, students, }}>
            {children}
        </StudentContext.Provider>
    )
}

export default StudentProvider