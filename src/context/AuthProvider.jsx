import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../config/fireBase";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null)
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (admin) => {
            setAdmin(admin);
        });

        return () => unSubscribe();
    }, [])

    const manualLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error)
        }
    }
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error)
        }
    }
    return <AuthContext.Provider value={{ admin, manualLogin, handleLogOut, googleSignIn }}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider