import { Admin, Branch, Dashboard, Exit, PcFill, UserBadge, } from "@rsuite/icons"
import { useContext } from "react"
import { Button, Nav, Sidenav } from "rsuite"
import { AuthContext } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom"

const AsideBar = ({ appearance, openKeys, expanded, onOpenChange, onExpand, ...navProps }) => {
    const navigate = useNavigate();
    const { admin, handleLogOut } = useContext(AuthContext);
    return (
        <aside className="h-full bg-[#f7f7fa] shadow-lg">
            <Sidenav
                appearance={appearance}
                expanded={expanded}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
            >
                <Sidenav.Header>
                    <div className="flex justify-center pt-4">
                        <div className="border rounded-full p-1">
                            <img
                                src={admin?.photoURL || "/images/user.png"}
                                alt="Profile"
                                className={`${expanded && "w-16 h-16"} w-10 h-10 rounded-full border border-gray-300 object-cover`}
                                onError={(e) => { e.currentTarget.src = "/images/user.png"; }}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </Sidenav.Header>
                <Sidenav.Body>
                    <Nav {...navProps}>
                        <Nav.Item icon={<Admin />} className={"pointer-events-none hover:bg-transparent"} >
                            <div className="font-semibold text-[#37474F]">{admin?.displayName || "Admin"}</div>
                            <div className="text-xs text-gray-500">{admin?.email}</div>
                        </Nav.Item>
                        <Nav.Item icon={<Dashboard />} onClick={() => navigate("/")} >Dashboard</Nav.Item>
                        <Nav.Menu eventKey="3" title="Labs" icon={<Branch />}>
                            <Nav.Item eventKey="3-1" onClick={() => navigate("/all-labs")}>All Labs</Nav.Item>
                            <Nav.Item eventKey="3-2" onClick={() => navigate("/add-lab")}>Add New Lab</Nav.Item>
                        </Nav.Menu>
                        <Nav.Menu eventKey="4" title="PCs" icon={<PcFill />}>
                            <Nav.Item eventKey="4-1" onClick={() => navigate("/all-pcs")}>All PCs</Nav.Item>
                            <Nav.Item eventKey="4-2" onClick={() => navigate("/add-pc")}>Add New PC</Nav.Item>
                        </Nav.Menu>
                        <Nav.Menu eventKey="5" title="Students" icon={<UserBadge />}>
                            <Nav.Item eventKey="5-1" onClick={() => navigate("/all-students")}>All Students</Nav.Item>
                            <Nav.Item eventKey="5-2" onClick={() => navigate("/add-student")}>Add New Student</Nav.Item>
                        </Nav.Menu>
                        <Nav.Item icon={<Exit />} className={!expanded && "pointer-events-none hover:bg-transparent"}>
                            <Button color="red" appearance="primary" style={{ borderRadius: 0 }} className="w-full" onClick={handleLogOut}>
                                Logout
                            </Button>
                        </Nav.Item>
                    </Nav>
                    <Sidenav.Toggle onToggle={onExpand} />
                </Sidenav.Body>
            </Sidenav>
        </aside>
    )
}

export default AsideBar