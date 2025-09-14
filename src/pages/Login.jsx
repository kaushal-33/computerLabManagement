import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
    const [userInput, setUserInput] = useState({ email: "", password: "" });
    const { manualLogin, googleSignIn } = useContext(AuthContext);
    const handleChange = (e) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await manualLogin(userInput.email, userInput.password);

    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input type="text" id="email" placeholder="Email" onChange={handleChange} value={userInput.email} />
                <input type="password" id="password" placeholder="Password" onChange={handleChange} value={userInput.password} />
                <button>Submit</button>
                <button type="button" onClick={googleSignIn}>google sign in</button>
            </form>
        </section>
    )
}

export default Login