import React from "react";
import { Form, Button, Row, Col, FormControl, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ReminderForm = ({ reminder, setReminder, handleSubmit, register, errors, mode }) => {
  const navigate = useNavigate();

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-2">
        <Col>
          <Form.Group controlId="formTitle">
            <FormLabel>Reminder Title</FormLabel>
            <FormControl
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter title"
              defaultValue={reminder.title} // Set default value if editing
            />
            {errors.title && <span className="text-danger">{errors.title.message}</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md="6">
          <Form.Group controlId="formDate">
            <FormLabel>Date</FormLabel>
            <FormControl
              {...register("date", { required: "Date is required" })}
              type="date"
              defaultValue={reminder.date} // Set default value if editing
            />
            {errors.date && <span className="text-danger">{errors.date.message}</span>}
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group controlId="formTime">
            <FormLabel>Time</FormLabel>
            <FormControl
              {...register("time", { required: "Time is required" })}
              type="time"
              defaultValue={reminder.time} // Set default value if editing
            />
            {errors.time && <span className="text-danger">{errors.time.message}</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md="6">
          <Form.Group controlId="formCategory">
            <FormLabel>Category</FormLabel>
            <Form.Select {...register("category", { required: "Category is required" })}>
              <option value="" disabled>Select Category</option>
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </Form.Select>
            {errors.category && <span className="text-danger">{errors.category.message}</span>}
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group controlId="formLeadTime">
            <FormLabel>Lead Time</FormLabel>
            <Form.Select {...register("leadTime", { required: "Lead time is required" })}>
              <option value="" disabled>Select Lead Time</option>
              <option value="5">5 minutes before</option>
              <option value="10">10 minutes before</option>
              <option value="15">15 minutes before</option>
              <option value="20">20 minutes before</option>
            </Form.Select>
            {errors.leadTime && <span className="text-danger">{errors.leadTime.message}</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md="12">
          <Form.Group controlId="formRecurring">
            <FormLabel>Recurring</FormLabel>
            <Form.Select {...register("recurring", { required: "Recurring option is required" })}>
              <option value="" disabled>Select One</option>
              <option value="Everyday">Everyday</option>
              <option value="Monday">Every Monday</option>
              <option value="Tuesday">Every Tuesday</option>
              <option value="Wednesday">Every Wednesday</option>
              <option value="Thursday">Every Thursday</option>
              <option value="Friday">Every Friday</option>
              <option value="Saturday">Every Saturday</option>
              <option value="Sunday">Every Sunday</option>
            </Form.Select>
            {errors.recurring && <span className="text-danger">{errors.recurring.message}</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col xs="12">
          <Form.Group controlId="formNotes">
            <FormLabel>Notes</FormLabel>
            <FormControl
              as="textarea"
              rows={3}
              placeholder="Enter message"
              {...register("notes", { required: "Notes are required" })}
            />
            {errors.notes && <span className="text-danger">{errors.notes.message}</span>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs="auto">
          <div className="d-flex gap-5">
            <Button
              variant="primary"
              type="submit"
              style={{ width: "150px", height: "50px", fontSize: "16px", backgroundColor: "#507DBC" }}
            >
              {mode === "edit" ? "Save Changes" : "Create Reminder"}
            </Button>

            <Button
              variant="danger"
              type="button"
              onClick={() => navigate("/reminders")}
              style={{ width: "150px", height: "50px", fontSize: "16px" }}
            >
              Cancel
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default ReminderForm;
