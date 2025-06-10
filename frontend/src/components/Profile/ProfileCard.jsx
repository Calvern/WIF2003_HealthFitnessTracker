import { Col, Row, Button } from "react-bootstrap";
import { GenderMale, GenderFemale } from "react-bootstrap-icons";
import EditableProfileImage from "./EditableProfileImage";

const ProfileCard = ({
  imagePreview,
  setImagePreview,
  isEditing,
  register,
  errors,
  firstName,
  lastName,
  gender,
  dob,
  createdAt,
}) => {
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
      <Col xs={12} md={3} lg={2}>
        <EditableProfileImage
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </Col>

      <Col xs={12} md={5} lg={8}>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center gap-2">
            <h2 className="fw-bold">
              {firstName} {lastName}
            </h2>
            {gender === "Male" ? (
              <GenderMale size={30} />
            ) : (
              <GenderFemale size={30} />
            )}
          </div>
          <p>
            {calculateAge(dob)} <br />
            Joined since{" "}
            {createdAt
              ? new Date(createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </div>
      </Col>

      <Col className="d-flex flex-column" xs={12} md={4} lg={2}>
        <Button
          type="submit"
          className="mt-auto py-2 px-5 rounded-4 border-0"
          style={{ backgroundColor: "#507DBC" }}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileCard;
