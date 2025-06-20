import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useDeleteAccount } from "../api/UsersApi";

const DeleteAccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { deleteUserAccount, isLoading } = useDeleteAccount();

  const handleDelete = async () => {
    try {
      await deleteUserAccount({ password });
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

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
          variant="danger"
          className="w-100 mt-3 rounded-3 mb-2"
          onClick={handleDelete}
          disabled={isLoading || !password}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Delete Account"
          )}
        </Button>
      </div>
    </Container>
  );
};

export default DeleteAccountPage;
