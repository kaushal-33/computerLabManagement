import { useContext, useState } from "react";
import { Button, ButtonToolbar, Form, Schema } from "rsuite";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const { StringType } = Schema.Types;

const model = Schema.Model({
    email: StringType()
        .isEmail("Please enter a valid email address.")
        .isRequired("This field is required."),
    password: StringType().isRequired("Password is required.").minLength("6"),
});

// ----------------------------------------------------------------------------

const LoginForm = () => {
    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { manualLogin } = useContext(AuthContext);

    const handleChange = (formValue) => {
        setUserInput(formValue);
    };
    const handleSubmit = async () => {
        await manualLogin(userInput.email, userInput.password);
        navigate("/");
    };

    return (
        <Form model={model} formValue={userInput} onChange={handleChange} onSubmit={handleSubmit}>
            <Form.Group controlId="email">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control name="email" type="email" />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.ControlLabel>Password</Form.ControlLabel>
                <Form.Control name="password" type="password" />
            </Form.Group>
            <ButtonToolbar>
                <Button appearance="primary" type="submit">
                    Submit
                </Button>
            </ButtonToolbar>
        </Form>
    );
};

export default LoginForm;
