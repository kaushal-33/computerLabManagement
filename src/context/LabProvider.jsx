import { addDoc, collection, getDocs } from "firebase/firestore";
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
        try {
            await addDoc(collection(db, "labs"), { createdAt: new Date(), ...input });
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
        <LabContext.Provider value={{ labs, loading, withPlaceholder, setLoading, setWithPlaceholder, addLab }}>
            {children}
        </LabContext.Provider>
    )
}

export default LabProvider