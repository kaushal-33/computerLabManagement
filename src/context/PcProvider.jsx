import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../config/fireBase";
import { LabContext } from "./LabProvider";
export const PcContext = createContext();

const PcProvider = ({ children }) => {
    // all pc
    const [pcs, setPcs] = useState([]);

    const { fetchLabs } = useContext(LabContext);
    console.log(pcs)
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
        const obj = pcs?.find(pc => pc.pcId === id);
        const { labLocation } = input;
        try {
            if (obj?.labLocation) {
                await updateDoc(doc(db, "labs", labLocation), { availableCapacity: increment(-1) });
                await updateDoc(doc(db, "labs", obj.labLocation), { availableCapacity: increment(1) });
            } else {
                await updateDoc(doc(db, "labs", labLocation), { availableCapacity: increment(-1) });
            }

            await updateDoc(doc(db, "pcs", id), input);
            fetchPcs();
            fetchLabs();
        } catch (error) {
            console.log("Error updating PC or labs:", error);
        }
    };



    const deletePc = async (id) => {
        try {
            const obj = pcs?.find((pc) => pc.pcId === id);
            const { labLocation } = obj;

            if (labLocation) {
                const labRef = doc(db, "labs", labLocation);
                const labSnap = await getDoc(labRef);

                if (labSnap.exists()) {
                    await updateDoc(labRef, { availableCapacity: increment(1) });
                }
            }

            try {
                const stuSnapshot = await getDocs(
                    query(collection(db, "students"), where("assignedPc", "==", id))
                );

                await Promise.all(
                    stuSnapshot.docs.map(stu =>
                        updateDoc(doc(db, "students", stu.id), { assignedPc: null })
                    )
                );
            } catch (error) {
                console.log("Error unassigning students:", error);
            }

            await deleteDoc(doc(db, "pcs", id));

            await fetchLabs();
            await fetchPcs();
        } catch (error) {
            console.log("Error deleting PC:", error);
        }

    };


    return (
        <PcContext.Provider value={{ addPc, pcs, updatePc, deletePc, fetchPcs }}>
            {children}
        </PcContext.Provider>
    )
}

export default PcProvider