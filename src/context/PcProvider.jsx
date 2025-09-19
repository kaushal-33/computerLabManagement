import { addDoc, collection, doc, getDocs, increment, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../config/fireBase";
export const PcContext = createContext();

const PcProvider = ({ children }) => {
    // all pc
    const [pcs, setPcs] = useState([]);

    // loader
    const [loading, setLoading] = useState(true);
    const [withPlaceholder, setWithPlaceholder] = useState(true);

    // const { labs } = useContext(LabContext);

    useEffect(() => {
        fetchPcs();
    }, [])
    const addPc = async (input) => {
        const { labLocation } = input;
        try {
            await addDoc(collection(db, "pcs"), { createdAt: new Date(), pcStatus: "available", ...input });
            await updateDoc(doc(db, "labs", labLocation), { availableCapacity: increment(-1) });
            fetchPcs();
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
            setWithPlaceholder(false);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    const updatePc = async (id, input) => {
        try {
            await updateDoc(doc(db, "pcs", id), input);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PcContext.Provider value={{ loading, withPlaceholder, addPc, pcs, updatePc }}>
            {children}
        </PcContext.Provider>
    )
}

export default PcProvider