import { Form } from "react-bootstrap";
import { CameraFill } from "react-bootstrap-icons";

const EditableProfileImage = ({
  imagePreview,
  setImagePreview,
  isEditing,
  register,
  errors,
}) => {
  return (
    <Form.Group className="mb-4 text-center">
      <div
        className="rounded-circle border d-flex align-items-center position-relative"
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
        {imagePreview ? (
          <img
            src={imagePreview}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Profile"
          />
        ) : (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <CameraFill size={40} />
          </div>
        )}

        {isEditing && imagePreview && (
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
        {...register("imageFile", {
          validate: (files) => {
            if (!files || files.length === 0) return true;
            if (files.length > 1) return "Only one image allowed";
            return true;
          },
          onChange: (e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImagePreview(URL.createObjectURL(file));
            }
          },
        })}
      />

      {errors?.imageFile && (
        <span className="text-danger">{errors.imageFile.message}</span>
      )}
    </Form.Group>
  );
};

export default EditableProfileImage;
