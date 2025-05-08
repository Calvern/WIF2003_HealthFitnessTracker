import { Toast } from "react-bootstrap";

const CustomToast = ({ message, onClose }) => {
  return (
    <Toast onClose={onClose} autohide delay={2000} bg="success">
      <Toast.Body className=" text-white">
        <p className="m-0">{message}</p>
      </Toast.Body>
    </Toast>
  );
};

export default CustomToast;
