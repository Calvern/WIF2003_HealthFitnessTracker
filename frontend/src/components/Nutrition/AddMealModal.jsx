import { Button, Form, Modal } from "react-bootstrap";

const AddMealModal = ({ show, handleClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add to Diary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Which meal would you like this to add to?
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Label htmlFor="meal-type">Meal Type</Form.Label>
          <Form.Select className="mb-3 shadow-none" id="meal-type">
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
          </Form.Select>
          <div className="mt-4 d-flex justify-content-end gap-3">
            <Button
              variant="secondary"
              className="rounded-4 px-4 py-2"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-4 px-4 py-2"
              style={{ backgroundColor: "#176087" }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMealModal;
