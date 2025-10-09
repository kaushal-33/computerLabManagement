// Login.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import LoginForm from "../components/LoginForm";

const Login = () => {
    const { googleSignIn } = useContext(AuthContext);
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="space-y-6 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Login</h2>
                <LoginForm />
                <button
                    type="button"
                    onClick={googleSignIn}
                    className="flex w-full items-center justify-center gap-3 py-3 rounded-xl border border-gray-400 bg-white hover:bg-gray-100 text-gray-900 font-semibold shadow-md transition-colors duration-300 ease-in-out"
                >
                    <img src="/images/google-icon.png" alt="google icon" className="w-6 h-6" />
                    <span>Continue with Google</span>
                </button>
            </div>
        </section>
    );
};

export default Login;
