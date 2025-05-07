import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const DeactivateAccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center">
      <div className="w-100 " style={{ maxWidth: "450px" }}>
        <h1 className="fw-bold text-center mb-4">Deactivate Account</h1>
        <p>
          Are you sure you want to deactivate your account? Your account will be
          temporarily disabled until you reactivate it by logging in to your
          account. To deactivate your account, please enter your password below
        </p>
        <Form.Group controlId="formConfirmPassword" className="mb-4">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <Button
              variant="outline-secondary"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeSlashFill /> : <EyeFill />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button
          style={{ backgroundColor: "#507DBC" }}
          className="w-100 mt-3 rounded-3 mb-2"
          type="submit"
        >
          Deactivate Account
        </Button>
      </div>
    </Container>
  );
};

export default DeactivateAccountPage;
