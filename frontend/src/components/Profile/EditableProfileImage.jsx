import { Form } from "react-bootstrap";
import { CameraFill } from "react-bootstrap-icons";

const EditableProfileImage = ({ formData, setFormData, isEditing }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  return (
    <Form.Group controlId="formFile" className="mb-4 text-center">
      <div
        className="rounded-circle border d-flex justify-content-center align-items-center mx-auto"
        style={{
          width: "120px",
          height: "120px",
          cursor: isEditing ? "pointer" : "default",
          overflow: "hidden",
          backgroundColor: "#D9D9D9",
          position: "relative",
        }}
        onClick={() => {
          if (isEditing) {
            document.getElementById("fileUpload").click();
          }
        }}
      >
        {formData.profileImage ? (
          <img
            src={formData.profileImage}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <CameraFill size={40} />
        )}
      </div>

      <Form.Control
        id="fileUpload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </Form.Group>
  );
};

export default EditableProfileImage;
