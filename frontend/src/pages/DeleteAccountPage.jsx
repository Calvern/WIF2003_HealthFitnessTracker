import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const DeleteAccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center">
      <div className="w-100 " style={{ maxWidth: "450px" }}>
        <h1 className="fw-bold text-center mb-4">Delete Account</h1>
        <p>
          Are you sure you want to delete your account? The account deletion is
          permanent and could not be recovered. This will erase all your account
          data from the site. To delete your account, please enter your password
          below
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
          style={{ backgroundColor: "#FF0000" }}
          className="w-100 mt-3 rounded-3 mb-2"
          type="submit"
        >
          Delete Account
        </Button>
      </div>
    </Container>
  );
};

export default DeleteAccountPage;
