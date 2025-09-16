import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import AsideBar from "../components/AsideBar";

const Dashboard = () => {
    // for aside bar
    const [expanded, setExpanded] = useState(true);
    const [openKeys, setOpenKeys] = useState(['3', '4'])

    return (
        <div className="h-screen flex">
            <AsideBar expanded={expanded} onExpand={setExpanded} openKeys={openKeys} onOpenChange={setOpenKeys} />
            <div className="w-full h-full border">
                Dashboard
            </div>
        </div>
    )
}

export default Dashboard