import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useAddFoodToDiary } from "../../api/FoodDiaryApi";

const AddMealModal = ({ show, meal, handleClose }) => {
  const { addFoodToDiary, isPending } = useAddFoodToDiary();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      date: formatDate(selectedDate),
      type: mealType,
      mealId: meal?.mealId,
      foodName: meal?.foodName,
    };
    await addFoodToDiary(formData);
    handleClose();
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealType, setMealType] = useState("breakfast");
  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // yyyy-mm-dd
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
          <Form.Group className="mb-3">
            <Form.Label className="me-3">Date</Form.Label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="meal-type">Meal Type</Form.Label>
            <Form.Select
              className="mb-3 shadow-none"
              id="meal-type"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </Form.Select>
          </Form.Group>
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
              {isPending ? <span>Submit </span> : <span>Adding</span>}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMealModal;
