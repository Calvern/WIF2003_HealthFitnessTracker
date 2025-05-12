import { Button, Container, Form } from "react-bootstrap";
import { CameraFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const CreateProfilePage = () => {
  const navigate = useNavigate();
  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center">
      <div
        className="border p-5 rounded-4 w-100 shadow "
        style={{ maxWidth: "450px" }}
      >
        <h1 className="fw-bold text-center mb-3">Create your profile</h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/calorie-calculator");
          }}
          className="w-100"
          style={{ maxWidth: "450px" }}
        >
          <Form.Group controlId="formFile" className="mb-4 text-center">
            <div
              className="rounded-circle border d-flex justify-content-center align-items-center mx-auto"
              style={{
                width: "120px",
                height: "120px",
                cursor: "pointer",
                overflow: "hidden",
                backgroundColor: "#D9D9D9",
              }}
              onClick={() => document.getElementById("fileUpload").click()}
            >
              <CameraFill size={40} />
            </div>
            <Form.Control
              id="fileUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
          </Form.Group>
          <div className="d-flex gap-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control required placeholder="First Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control required placeholder="Last Name" />
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date of birth</Form.Label>
            <Form.Control required type="date" placeholder="Password" />
          </Form.Group>

          <Button
            style={{ backgroundColor: "#507DBC" }}
            className="w-100 mt-3 rounded-3 mb-2"
            type="submit"
          >
            Create
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default CreateProfilePage;
