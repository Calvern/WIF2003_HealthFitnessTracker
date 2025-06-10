import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Row, Col, InputGroup } from "react-bootstrap";
import ProfileCard from "../components/Profile/ProfileCard";
import { useNavigate } from "react-router-dom";
import { useGetProfile, useUpdateProfile } from "../api/UsersApi";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { updateUserProfile } = useUpdateProfile();
  const { user: profile, isLoading } = useGetProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (profile) {
      reset({
        profileImage: profile.profilePictureUrl,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        dob: profile.dob?.split("T")[0],
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        activityLevel: profile.activityLevel,
        weightGoal: profile.weightGoal,
        createdAt: profile.createdAt,
      });
      setImagePreview(profile.profilePictureUrl || "");
    }
  }, [profile, reset]);

  const formValues = watch();

  const toggleEdit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleSubmit(onSubmit)();
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key !== "imageFile") {
        formData.append(key, data[key]);
      }
    }
    if (data.imageFile?.[0]) {
      formData.append("imageFile", data.imageFile[0]);
    }
    updateUserProfile(formData);
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container className="py-5">
      <h2 className="fw-bold">Profile</h2>
      <Form onSubmit={toggleEdit}>
        <ProfileCard
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          isEditing={isEditing}
          register={register}
          errors={errors}
          firstName={formValues.firstName}
          lastName={formValues.lastName}
          gender={formValues.gender}
          dob={formValues.dob}
          createdAt={formValues.createdAt}
        />
        <Row className="mb-5 g-5">
          <Col md={6}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                {...register("firstName", { required: true })}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                {...register("lastName", { required: true })}
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
                type="email"
                {...register("email", { required: true })}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                {...register("dob", { required: true })}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-5 g-5">
          <Col md={6}>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                {...register("gender", { required: true })}
                disabled={!isEditing}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formWeight">
              <Form.Label>Weight</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  min={0}
                  {...register("weight", { required: true })}
                  disabled={!isEditing}
                />
                <InputGroup.Text>kg</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formHeight">
              <Form.Label>Height</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  min={0}
                  {...register("height", { required: true })}
                  disabled={!isEditing}
                />
                <InputGroup.Text>cm</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-5 g-5">
          <Col md={6}>
            <Form.Group controlId="formActivityLevel">
              <Form.Label>Activity Level</Form.Label>
              <Form.Select
                {...register("activityLevel", { required: true })}
                disabled={!isEditing}
              >
                <option value={1.2}>Sedentary (little/no exercise)</option>
                <option value={1.375}>Lightly Active (1-3 days/week)</option>
                <option value={1.55}>Moderately Active (3-5 days/week)</option>
                <option value={1.725}>Very Active (6-7 days/week)</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formWeightGoal">
              <Form.Label>Weight Goal</Form.Label>
              <Form.Select
                {...register("weightGoal", { required: true })}
                disabled={!isEditing}
              >
                <option value={-500}>Lose Weight</option>
                <option value={0}>Maintain Weight</option>
                <option value={500}>Gain Weight</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <div className="d-flex flex-column flex-md-row gap-5 justify-content-center mt-5">
        <Button
          className="py-2 px-5 rounded-4 border-0"
          onClick={() => navigate("/change-password")}
          style={{ backgroundColor: "#507DBC" }}
        >
          Change Password
        </Button>
        <Button
          className="py-2 px-5 rounded-4 border-0"
          onClick={() => navigate("/deactivate-account")}
          style={{ backgroundColor: "#507DBC" }}
        >
          Deactivate Account
        </Button>
        <Button
          className="py-2 px-5 rounded-4 border-0"
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
