import { Button, Container, Form } from "react-bootstrap";

const ForgotPasswordPage = () => {
    return (
        <Container className="mt-5 d-flex flex-column justify-content-center align-items-center flex-fill">
          <div
            className="border p-5 rounded-4 w-100 shadow "
            style={{ maxWidth: "450px" }}
          >
            <h1 className="fw-bold text-center mb-5">Reset Your Password</h1>
            <p className="mb-3">Enter your e-mail associated with your account. An e-mail with instructions to reset your password will be sent to your e-mail. </p>
            <Form className="w-100" style={{ maxWidth: "450px" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
    
          
              <Button
                style={{ backgroundColor: "#507DBC" }}
                className="w-100 rounded-3 mb-2"
                type="submit"
                onClick={() => {
                  navigate("/create-profile");
                }}
              >
                Send
              </Button>
            </Form>

          </div>
        </Container>
      );
}

export default ForgotPasswordPage;