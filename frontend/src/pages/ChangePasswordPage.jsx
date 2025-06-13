import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useChangePassword } from "../api/UsersApi";
import { useAppContext } from "../contexts/AppContext";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { changeUserPassword, isLoading } = useChangePassword();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { currentPassword, newPassword } = data;

    try {
      await changeUserPassword({ currentPassword, newPassword });
      navigate("/profile");
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <h1 className="fw-bold text-center mb-4">Change Password</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formCurrentPassword" className="mb-4">
            <Form.Label>Current Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                {...register("currentPassword", {
                  required: "This field is required",
                })}
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
            </InputGroup>
            {errors.currentPassword && (
              <span className="text-danger">
                {errors.currentPassword.message}
              </span>
            )}
          </Form.Group>

          <Form.Group controlId="formNewPassword" className="mb-4">
            <Form.Label>New Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
            </InputGroup>
            {errors.newPassword && (
              <span className="text-danger">{errors.newPassword.message}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                {...register("confirmPassword", {
                  required: "This field is required",
                  validate: (val) =>
                    val === watch("newPassword") || "Passwords do not match",
                })}
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
            </InputGroup>
            {errors.confirmPassword && (
              <span className="text-danger">
                {errors.confirmPassword.message}
              </span>
            )}
          </Form.Group>

          <Button
            style={{ backgroundColor: "#507DBC" }}
            className="w-100 mt-3 rounded-3 mb-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ChangePasswordPage;
