import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./pages/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ErrorPage from "./pages/ErrorPage"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App