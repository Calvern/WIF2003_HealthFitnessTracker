import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegister } from "../api/UsersApi";



const RegisterPage = () => {
  const { registerUser } = useRegister();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    registerUser(data);
  });
  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center flex-fill">
      <div
        className="border p-5 rounded-4 w-100 shadow "
        style={{ maxWidth: "450px" }}
      >
        <h1 className="fw-bold text-center mb-5">Register</h1>
        <Form
          onSubmit={onSubmit}
          className="w-100"
          style={{ maxWidth: "450px" }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register("email", {
                required: "This field is required",
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
            <Form.Control
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Comfirm Password</Form.Label>
            <Form.Control
              {...register("comfirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Your password do not match";
                  }
                },
              })}
              type="password"
              placeholder="Password"
            />
            {errors.comfirmPassword && (
              <span className="text-danger">
                {errors.comfirmPassword.message}
              </span>
            )}
          </Form.Group>
          <Button
            style={{ backgroundColor: "#507DBC" }}
            className="w-100 rounded-3 mb-2"
            type="submit"
          >
            Register
          </Button>
        </Form>
        <span className="text-center ">
          Already have an account?{" "}
          <Link to="/sign-in" className="link-style">
            Sign In
          </Link>
        </span>
      </div>
    </Container>
  );
};

export default RegisterPage;
