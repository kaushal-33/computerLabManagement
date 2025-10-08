import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react"
import { db } from "../config/fireBase";

export const LabContext = createContext();
const LabProvider = ({ children }) => {
    // all labs
    const [labs, setLabs] = useState([]);

    // loader
    const [loading, setLoading] = useState(true);
    const [withPlaceholder, setWithPlaceholder] = useState(true);

    useEffect(() => {
        fetchLabs();
    }, [])

    const addLab = async (input) => {

        const { labCapacity, ...data } = input;

        try {
            await addDoc(collection(db, "labs"), { createdAt: new Date(), availableCapacity: parseInt(labCapacity), labCapacity: parseInt(labCapacity), ...data });
            fetchLabs();
        } catch (error) {
            console.log(error)
        }
    }

    const updateLab = async (labId, input) => {
        const { labCapacity, availableCapacity, ...data } = input;
        console.log(labCapacity)
        try {
            await updateDoc(doc(db, "labs", labId), { availableCapacity: parseInt(labCapacity), labCapacity: parseInt(labCapacity), ...data });
            fetchLabs();
        } catch (error) {
            console.log(error)
        }
    }

    const deleteLab = async (labId) => {
        try {
            const pcsSnapshot = await getDocs(query(collection(db, "pcs"), where("labLocation", "==", labId)));
            const studentsSnapshot = await getDocs(query(collection(db, "students"), where("labLocation", "==", labId)));
            await Promise.all(
                pcsSnapshot.docs.map((pcDoc) =>
                    updateDoc(doc(db, "pcs", pcDoc.id), { labLocation: null })
                ),
                studentsSnapshot.docs.map((stu) =>
                    updateDoc(doc(db, "students", stu.id), { labLocation: null })
                )
            );
            await deleteDoc(doc(db, "labs", labId));
            fetchLabs();
        } catch (error) {
            console.log(error)
        }
    }

    const fetchLabs = async () => {
        try {
            let { docs } = await getDocs(collection(db, "labs"));
            let labArr = docs.map((lab) => {
                return { labId: lab.id, ...lab.data() }
            })
            setLabs(labArr);
            setWithPlaceholder(false);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <LabContext.Provider value={{ labs, loading, withPlaceholder, addLab, updateLab, deleteLab, fetchLabs }}>
            {children}
        </LabContext.Provider>
    )
}

export default LabProvider