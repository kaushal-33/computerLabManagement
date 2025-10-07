import { addDoc, collection, deleteDoc, doc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../config/fireBase";
import { LabContext } from "./LabProvider";
export const PcContext = createContext();

const PcProvider = ({ children }) => {
    // all pc
    const [pcs, setPcs] = useState([]);

    const { fetchLabs } = useContext(LabContext);

    useEffect(() => {
        fetchPcs();
    }, [])
    const addPc = async (input) => {
        const { labLocation } = input;
        try {
            await addDoc(collection(db, "pcs"), { createdAt: new Date(), pcStatus: "available", ...input });
            await updateDoc(doc(db, "labs", labLocation), { availableCapacity: increment(-1) });
            await fetchPcs();
            await fetchLabs();

        } catch (error) {
            console.log(error)
        }
    }
    const fetchPcs = async () => {
        try {
            let { docs } = await getDocs(collection(db, "pcs"));
            let pcArr = docs?.map((pc) => {
                return { pcId: pc.id, ...pc.data() }
            })
            setPcs(pcArr);
        } catch (error) {
            console.log(error)
        }
    }

    const updatePc = async (id, input) => {
        const obj = pcs?.find(pc => pc.pcId === id)
        const { labLocation } = input;
        try {
            await updateDoc(doc(db, "pcs", id), input);
            await updateDoc(doc(db, "labs", labLocation), { availableCapacity: increment(-1) });
            await updateDoc(doc(db, "labs", obj.labLocation), { availableCapacity: increment(1) });
        } catch (error) {
            console.log(error)
        }
        fetchPcs();
        fetchLabs();
    }

    const deletePc = async (id) => {
        const obj = pcs?.find((pc) => pc.pcId === id);
        const { labLocation } = obj;
        try {
            if (labLocation) {
                await updateDoc(doc(db, "labs", labLocation), { availableCapacity: increment(1) });
            }


            try {
                let stuSnapshot = await getDocs(query(collection(db, "students"), where("assignedPc", "==", id)));
                stuSnapshot.forEach(stu => {
                    updateDoc(doc(db, "students", stu.id), { assignedPc: null });
                });
            } catch (error) {
                console.log(error)
            }


            await deleteDoc(doc(db, "pcs", id));
        } catch (error) {
            console.log(error);
        }
        fetchLabs();
        fetchPcs();
    }

    return (
        <PcContext.Provider value={{ addPc, pcs, updatePc, deletePc, fetchPcs }}>
            {children}
        </PcContext.Provider>
    )
}

export default PcProvider