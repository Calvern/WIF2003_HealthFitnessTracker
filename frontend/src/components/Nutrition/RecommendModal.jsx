import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

const RecommendModal = ({ show, handleClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Suggest meals</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please tell us how much calorie you want for your today's meal!
        <Form onSubmit={handleSubmit} className="mt-3">
          <InputGroup>
            <FormControl
              className="shadow-none "
              type="number"
              step="any"
              placeholder="Calories in kCal"
            ></FormControl>
            <InputGroup.Text>kCal</InputGroup.Text>
          </InputGroup>
          <div className="mt-4 d-flex justify-content-end gap-3">
            <Button variant="secondary" className="px-4 py-2" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="px-4 py-2" style={{ backgroundColor: "#176087" }}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecommendModal;
