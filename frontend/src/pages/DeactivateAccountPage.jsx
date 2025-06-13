import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useDeactivateAccount } from "../api/UsersApi";
import { useAppContext } from "../contexts/AppContext";

const DeactivateAccountPage = () => {
  const { showToast } = useAppContext();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { deactivateUserAccount, isLoading } = useDeactivateAccount();

  const handleDeactivate = async () => {
    try {
      await deactivateUserAccount({ password });
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <h1 className="fw-bold text-center mb-4">Deactivate Account</h1>
        <p>
          Are you sure you want to deactivate your account? Your account will be
          temporarily disabled until you reactivate it by logging in. Please
          enter your password below to confirm.
        </p>
        <Form.Group controlId="formConfirmPassword" className="mb-4">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleDeactivate}
          className="w-100 mt-3 rounded-3 mb-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Deactivate Account"
          )}
        </Button>
      </div>
    </Container>
  );
};

export default DeactivateAccountPage;
