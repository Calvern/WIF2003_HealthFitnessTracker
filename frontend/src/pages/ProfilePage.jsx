import { useState } from "react";
import { Button, Container, Form, Row, Col, InputGroup } from "react-bootstrap";
import ProfileCard from "../components/Profile/ProfileCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { showToast } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    profileImage:
      "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
    firstName: "Loiue",
    lastName: "Volkman",
    email: "loiuevolkman@gmail.com",
    dob: "2003-05-05",
    gender: 1,
    height: 180,
    weight: 75,
    activity_level: 1.375,
    weight_goal: 0,
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const toggleEdit = (e) => {
    e.preventDefault();
    if (isEditing) {
      showToast("Profile updated successfully!");
    }
    setIsEditing(!isEditing);
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold">Profile</h2>
      <Form onSubmit={toggleEdit}>
        <ProfileCard
          formData={formData}
          isEditing={isEditing}
          setFormData={setFormData}
        />
        <Row className="mb-5 g-5">
          <Col md={6}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-5 g-5">
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange("email")}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                required
                type="date"
                value={formData.dob}
                onChange={handleChange("dob")}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className=" mb-5 g-5">
          <Col md={6}>
            <Form.Label htmlFor="gender">Gender</Form.Label>
            <Form.Select
              required
              className="shadow-none"
              id="gender"
              value={formData.gender}
              onChange={handleChange("gender")}
              disabled={!isEditing}
            >
              <option value={0}>Female</option>
              <option value={1}>Male</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Label htmlFor="weight">Weight</Form.Label>
            <InputGroup>
              <Form.Control
                required
                value={formData.weight}
                onChange={handleChange("weight")}
                type="number"
                min={0}
                id="weight"
                disabled={!isEditing}
              />
              <InputGroup.Text>kg</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Label htmlFor="height">Height</Form.Label>
            <InputGroup>
              <Form.Control
                required
                value={formData.height}
                onChange={handleChange("height")}
                type="number"
                min={0}
                id="height"
                disabled={!isEditing}
              />
              <InputGroup.Text>cm</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <Row className=" mb-5 g-5">
          <Col md={6}>
            <Form.Label htmlFor="activity-level">Activity Level</Form.Label>
            <Form.Select
              className="mb-3 shadow-none"
              id="activity-level"
              value={formData.activity_level}
              onChange={handleChange("activity_level")}
              disabled={!isEditing}
            >
              <option value={1.2}>Sedentary (little/no exercise)</option>
              <option value={1.375}>Lightly Active (1-3 days/week)</option>
              <option value={1.55}>Moderately Active (3-5 days/week)</option>
              <option value={1.725}>Very Active (6-7 days/week)</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Label htmlFor="weight-goal">Weight Goal</Form.Label>
            <Form.Select
              className="mb-3 shadow-none"
              id="weight-goal"
              value={formData.weight_goal}
              onChange={handleChange("weight_goal")}
              disabled={!isEditing}
            >
              <option value={-300}>Lose Weight</option>
              <option value={0}>Maintain Weight</option>
              <option value={300}>Gain Weight</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      <div className="d-flex flex-column flex-md-row gap-5 justify-content-center">
        <Button
          className="py-2 px-5 rounded-4 border-0"
          onClick={() => navigate("/change-password")}
          style={{ backgroundColor: "#507DBC" }}
        >
          Change Password
        </Button>
        <Button
          className=" py-2 px-5 rounded-4 border-0"
          onClick={() => navigate("/deactivate-account")}
          style={{ backgroundColor: "#507DBC" }}
        >
          Deactivate Account
        </Button>
        <Button
          className=" py-2 px-5 rounded-4 border-0"
          onClick={() => navigate("/delete-account")}
          style={{ backgroundColor: "#FF0000" }}
        >
          Delete Account
        </Button>
      </div>
    </Container>
  );
};

export default ProfilePage;
