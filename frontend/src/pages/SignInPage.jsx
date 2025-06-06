import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignInUser } from "../api/AuthApi";

const SignInPage = () => {
  const { signIn } = useSignInUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });
  return (
    <Container className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <div
        className="border p-5 rounded-4 w-100 shadow "
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
        <span className="text-center ">
          Don't have an account?{" "}
          <Link to="/register" className="link-style">
            Register
          </Link>
        </span>
      </div>
    </Container>
  );
};

export default SignInPage;
