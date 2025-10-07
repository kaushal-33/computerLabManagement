// LoginForm.js
import { useContext, useState } from "react";
import { Button, ButtonToolbar, Form, Schema } from "rsuite";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const { StringType } = Schema.Types;

const model = Schema.Model({
    email: StringType()
        .isEmail("Please enter a valid email address.")
        .isRequired("This field is required."),
    password: StringType().isRequired("Password is required.").minLength(6),
});

const LoginForm = () => {
    const [userInput, setUserInput] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { manualLogin } = useContext(AuthContext);

    const handleChange = (formValue) => setUserInput(formValue);

    const handleSubmit = async () => {
        await manualLogin(userInput.email, userInput.password);
        navigate("/");
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
            <Form model={model} formValue={userInput} onChange={handleChange} onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-4">
                    <Form.ControlLabel className="text-gray-700 font-medium">Email</Form.ControlLabel>
                    <Form.Control style={{ minWidth: "384px" }}
                        name="email"
                        type="email"
                        className="border  border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </Form.Group>
                <Form.Group controlId="password" className="mb-6">
                    <Form.ControlLabel className="text-gray-700 font-medium">Password</Form.ControlLabel>
                    <Form.Control style={{ minWidth: "384px" }}
                        name="password"
                        type="password"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </Form.Group>
                <ButtonToolbar>
                    <Button appearance="primary" type="submit" className="w-full bg-blue-600 hover:bg-blue-700 border-none">
                        Submit
                    </Button>
                </ButtonToolbar>
            </Form>
        </div>
    );
};

export default LoginForm;
