import { Button, Container, Form } from "react-bootstrap";
import { CameraFill } from "react-bootstrap-icons";
import { useCreateProfile } from "../api/UsersApi";
import { useForm } from "react-hook-form";
import { useState } from "react";

const CreateProfilePage = () => {
  const { createUserProfile } = useCreateProfile();

  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("gender", data.gender);
    formData.append("dob", data.dob);
    if (data.imageFile && data.imageFile.length > 0) {
      formData.append("imageFile", data.imageFile[0]);
    }
    createUserProfile(formData);
  });
  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center">
      <div
        className="border p-5 rounded-4 w-100 shadow "
        style={{ maxWidth: "450px" }}
      >
        <h1 className="fw-bold text-center mb-3">Create your profile</h1>
        <Form
          onSubmit={onSubmit}
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
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <CameraFill size={40} />
              )}
            </div>
            <Form.Control
              {...register("imageFile", {
                validate: (imageFiles) => {
                  if (imageFiles.length > 1) {
                    return "You can only upload one image at once";
                  }
                  return true;
                },
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  } else {
                    setImagePreview(null);
                  }
                },
              })}
              id="fileUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
            {errors.imageFile && (
              <span className="text-danger">{errors.imageFile.message}</span>
            )}
          </Form.Group>
          <div className="d-flex gap-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                {...register("firstName", {
                  required: "This field is required",
                })}
                placeholder="First Name"
              />
              {errors.firstName && (
                <span className="text-danger">{errors.firstName.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                {...register("lastName", {
                  required: "This field is required",
                })}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <span className="text-danger">{errors.lastName.message}</span>
              )}
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              {...register("gender", {
                required: "This field is required",
              })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
            {errors.email && (
              <span className="text-danger">{errors.gender.message}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date of birth</Form.Label>
            <Form.Control
              {...register("dob", {
                required: "This field is required",
              })}
              type="date"
              placeholder="Date of Birth"
            />
            {errors.dob && (
              <span className="text-danger">{errors.dob.message}</span>
            )}
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
