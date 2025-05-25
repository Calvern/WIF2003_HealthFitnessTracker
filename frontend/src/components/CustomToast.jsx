import { Toast } from "react-bootstrap";

const CustomToast = ({ message, onClose }) => {
  return (
    <Toast
      onClose={onClose}
      autohide
      delay={1000}
      bg="success"
      style={{ width: "200px" }}
    >
      <Toast.Body className=" text-white">
        <p className="m-0">{message}</p>
      </Toast.Body>
    </Toast>
  );
};

export default CustomToast;
