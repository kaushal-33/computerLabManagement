import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"

const Dashboard = () => {
    const { handleLogOut } = useContext(AuthContext);

    return (
        <div>Dashboard
            <button type="button" onClick={handleLogOut}>Logout</button>
        </div>
    )
}

export default Dashboard