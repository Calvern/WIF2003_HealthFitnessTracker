import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center flex-fill">
      <div
        className="border p-5 rounded-4 w-100 shadow "
        style={{ maxWidth: "450px" }}
      >
        <h1 className="fw-bold text-center mb-5">Register</h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setIsLoggedIn(true);
            navigate("/create-profile");
          }}
          className="w-100"
          style={{ maxWidth: "450px" }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Comfirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
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
