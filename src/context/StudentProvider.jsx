import { createContext, useContext, useEffect, useState } from "react"
import { LabContext } from "./LabProvider";
import { PcContext } from "./PcProvider";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/fireBase";

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

    const updateStudent = async (id, input) => {
        try {
            await updateDoc(doc(db, "students", id), input);
            await updateDoc(doc(db, "pcs", input.assignedPc), { pcStatus: "assigned" });
            fetchStudents()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteStudent = async (id) => {
        let stu = students.find((stu) => stu.studentId === id)
        try {
            await deleteDoc(doc(db, "students", id));
            await updateDoc(doc(db, "pcs", stu.assignedPc), { pcStatus: "available" });
            fetchStudents()
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <StudentContext.Provider value={{ addStudent, students, updateStudent, deleteStudent }}>
            {children}
        </StudentContext.Provider>
    )
}

export default StudentProvider