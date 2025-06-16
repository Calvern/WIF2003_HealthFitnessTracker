import { useState } from "react";
import { Container, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignInUser } from "../api/AuthApi";
import { Modal } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

const SignInPage = () => {
  const { signIn } = useSignInUser();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (data, reactivate = false) => {
    setCredentials(data);
    try {
      await signIn({ ...data, reactivate });
    } catch (error) {
      if (error.message.toLowerCase().includes("deactivated")) {
        setShowModal(true);
      } else {
        setLoginError(error.message);
      }
    }
  };

  const onSubmit = handleSubmit((data) => handleLogin(data));

  const handleReactivate = () => {
    setShowModal(false);
    handleLogin(credentials, true);
  };

  return (
    <Container className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <div
        className="border p-5 rounded-4 w-100 shadow"
        style={{ maxWidth: "450px" }}
      >
        <h1 className="fw-bold text-center mb-5">Sign In</h1>

        <Form
          onSubmit={onSubmit}
          className="w-100"
          style={{ maxWidth: "450px" }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register("email", {
                required: "This field is reqiured",
              })}
              type="email"
              placeholder="Enter email"
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
            </InputGroup>
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </Form.Group>
          <Link to="/forgot-password" className="link-style">
            Forgot password?
          </Link>
          <Button
            style={{ backgroundColor: "#507DBC" }}
            className="w-100 mt-3 rounded-3 mb-2"
            type="submit"
          >
            Sign In
          </Button>
        </Form>
        <span className="text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="link-style">
            Register
          </Link>
        </span>
      </div>

      {/* 🔔 Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reactivate Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your account is deactivated. Would you like to reactivate it now?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleReactivate}>
            Reactivate
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SignInPage;
