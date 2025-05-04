import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";


const SignInPage = () => {
  const navigate = useNavigate();
  return (
    <Container className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <div
        className="border p-5 rounded-4 w-100 shadow "
        style={{ maxWidth: "450px" }}
      >
        <h1 className="fw-bold text-center mb-5">Sign In</h1>

        <Form className="w-100" style={{ maxWidth: "450px" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Link to="/forgot-password" className="link-style">
            Forgot password?
          </Link>
          <Button
            style={{ backgroundColor: "#507DBC" }}
            className="w-100 mt-3 rounded-3 mb-2"
            type="submit"
            onClick={() => {
              navigate("/home");
            }}
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
