import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import AsideBar from "../components/AsideBar";

const Dashboard = () => {
    const [expanded, setExpanded] = useState(true);
    const { handleLogOut } = useContext(AuthContext);

    return (
        <div className="h-screen flex">
            <AsideBar expanded={expanded} onExpand={setExpanded} />
            <div className="w-full h-full border">
                Dashboard
            </div>
        </div>
    )
}

export default Dashboard