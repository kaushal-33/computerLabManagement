import { addDoc, collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react"
import { db } from "../config/fireBase";
export const PcContext = createContext();

const PcProvider = ({ children }) => {
    // all pc
    const [pcs, setPcs] = useState([]);

    // loader
    const [loading, setLoading] = useState(true);
    const [withPlaceholder, setWithPlaceholder] = useState(true);

    useEffect(() => {
        fetchPcs();
    }, [])
    const addPc = async (input) => {
        try {
            await addDoc(collection(db, "pcs"), { createdAt: new Date(), ...input });
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

    return (
        <PcContext.Provider value={{ loading, withPlaceholder, addPc, pcs }}>
            {children}
        </PcContext.Provider>
    )
}

export default PcProvider