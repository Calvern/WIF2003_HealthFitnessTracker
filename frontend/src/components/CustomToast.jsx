import { Toast } from "react-bootstrap";

const CustomToast = ({ message, onClose, variant = "success" }) => {
  return (
    <Toast
      onClose={onClose}
      autohide
      delay={1000}
      bg={variant}
      style={{ width: "200px" }}
    >
      <Toast.Body className=" text-white">
        <p className="m-0">{message}</p>
      </Toast.Body>
    </Toast>
  );
};

export default CustomToast;
