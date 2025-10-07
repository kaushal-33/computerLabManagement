import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthProvider";
import Login from "./Login";

const ProtectedRoute = ({ Component }) => {
    const { admin } = useContext(AuthContext);
    if (!admin) {
        return <Login />
    }
    return (
        <Component />
    )
}

export default ProtectedRoute