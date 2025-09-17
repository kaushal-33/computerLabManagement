import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./pages/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ErrorPage from "./pages/ErrorPage"
import AllLabs from "./pages/AllLabs"
import AddLab from "./pages/addLab"
import AsideBar from "./components/AsideBar"
import { useContext, useState } from "react"
import { AuthContext } from "./context/AuthProvider"

const App = () => {
    // for aside bar
    const [expanded, setExpanded] = useState(true);
    const [openKeys, setOpenKeys] = useState(['3'])
    const { admin } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <div className="h-screen flex">
                {admin && <AsideBar expanded={expanded} onExpand={setExpanded} openKeys={openKeys} onOpenChange={setOpenKeys} />}
                <div className="w-full h-full border">
                    <Routes>
                        <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/all-labs" element={<ProtectedRoute Component={AllLabs} />} />
                        <Route path="/add-lab" element={<ProtectedRoute Component={AddLab} />} />
                        <Route path="/add-lab/:labId" element={<ProtectedRoute Component={AddLab} />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>

        </BrowserRouter>
    )
}

export default App