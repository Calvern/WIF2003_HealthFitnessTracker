import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center">
      <div className="w-100 " style={{ maxWidth: "450px" }}>
        <h1 className="fw-bold text-center mb-4">Change Password</h1>
        <Form.Group controlId="formCurrentPassword" className="mb-4">
          <Form.Label>Current Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter current password"
            />
            <Button
              variant="outline-secondary"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeSlashFill /> : <EyeFill />}
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formNewPassword" className="mb-4">
          <Form.Label>New Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
            />
            <Button
              variant="outline-secondary"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeSlashFill /> : <EyeFill />}
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formConfirmPassword" className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
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
          onClick={() => navigate("/profile")}
          className="w-100 mt-3 rounded-3 mb-2"
          type="submit"
        >
          Update Password
        </Button>
      </div>
    </Container>
  );
};

export default ChangePasswordPage;
