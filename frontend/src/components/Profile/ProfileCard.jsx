import { Col, Row, Image, Button, Form } from "react-bootstrap";
import { GenderMale, GenderFemale } from "react-bootstrap-icons";
import { CameraFill } from "react-bootstrap-icons";
import EditableProfileImage from "./EditableProfileImage";

const ProfileCard = ({ formData, isEditing, toggleEdit }) => {
  const { profileImage, firstName, lastName, gender, dob } = formData;

  // Calculate age (if dateOfBirth is a valid date string)
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return isNaN(age) ? "N/A" : `${age} years old`;
  };

  return (
    <Row className="my-4">
      <Col xs={2}>
        {/* <Image
          src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
          roundedCircle
          width={150}
          height={150}
        /> */}
        <Form.Group controlId="formFile" className="mb-4 text-center">
          <div
            className="rounded-circle border d-flex justify-content-center align-items-center mx-auto position-relative"
            style={{
              width: "150px",
              height: "150px",
              cursor: isEditing ? "pointer" : "default",
              overflow: "hidden",
              backgroundColor: "#D9D9D9",
            }}
            onClick={() => {
              if (isEditing) document.getElementById("fileUpload").click();
            }}
          >
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt="Profile"
              />
            ) : (
              <CameraFill size={40} />
            )}

            {/* Camera icon overlay when editing and image exists */}
            {isEditing && formData.profileImage && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CameraFill size={40} color="white" />
              </div>
            )}
          </div>

          <Form.Control
            id="fileUpload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            disabled={!isEditing}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setFormData({ ...formData, profileImage: imageUrl });
              }
            }}
          />
        </Form.Group>
      </Col>

      <Col xs={6}>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center gap-2">
            <h2 className="fw-bold">
              {firstName} {lastName}
            </h2>
            {gender === 1 ? (
              <GenderMale size={30} />
            ) : (
              <GenderFemale size={30} />
            )}
          </div>
          <p>
            {calculateAge(dob)} <br />
            Joined since 25 April 2025
          </p>
        </div>
      </Col>

      <Col xs={4} className="position-relative">
        <Button
          className="position-absolute bottom-0 end-0 py-2 px-5 rounded-4 border-0"
          style={{ backgroundColor: "#507DBC" }}
          onClick={toggleEdit}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileCard;
