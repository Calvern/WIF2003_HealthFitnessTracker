import React from 'react';
import {
    Form,
    Button,
    Row,
    Col,
    FormControl,
    FormLabel,
  } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const ReminderForm = ({ reminder, setReminder, handleSubmit, mode }) => {

  const navigate = useNavigate();

  const handleNavigateToReminders =() =>{
   navigate("/reminders");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-2">
        <Col>
          <Form.Group controlId="formTitle">
            <FormLabel>Reminder Title</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter title"
              value={reminder.title}
              onChange={(e) => setReminder({ ...reminder, title: e.target.value })}
              required />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md="6">
          <Form.Group controlId="formDate">
            <FormLabel>Date</FormLabel>
            <FormControl
              type="date"
              value={reminder.date}
              onChange={(e) => setReminder({ ...reminder, date: e.target.value })}
              required />
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group controlId="formTime">
            <FormLabel>Time</FormLabel>
            <FormControl
              type="time"
              value={reminder.time}
              onChange={(e) => setReminder({ ...reminder, time: e.target.value })}
              required />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md="6">
          <Form.Group controlId="formCategory">
            <FormLabel>Category</FormLabel>
            <Form.Select
              value={reminder.category}
              onChange={(e) => setReminder({ ...reminder, category: e.target.value })}
              required>
              <option value="" disabled>
                Select Category 
              </option>
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group controlId="formLeadTime">
            <FormLabel>Lead Time</FormLabel>
            <Form.Select 
              value={reminder.leadTime}
              onChange={(e) => setReminder({ ...reminder, leadTime: e.target.value })}
              required>
              <option value="" disabled>
                Select Lead Time 
              </option>
              <option value="5">5 minutes before</option>
              <option value="10">10 minutes before</option>
              <option value="15">15 minutes before</option>
              <option value="20">20 minutes before</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md="12">
          <Form.Group controlId="formRecurring">
            <FormLabel>Recurring</FormLabel>
            <Form.Select
              value={reminder.recurring}
              onChange={(e) => setReminder({ ...reminder, recurring: e.target.value })}
              required >
              <option value="" disabled>
                Select One 
              </option>
              <option value="Everyday">Everyday</option>
              <option value="Monday">Every Monday</option>
              <option value="Tuesday">Every Tuesday</option>
              <option value="Wednesday">Every Wednesday</option>
              <option value="Thursday">Every Thursday</option>
              <option value="Friday">Every Friday</option>
              <option value="Saturday">Every Saturday</option>
              <option value="Sunday">Every Sunday</option>
            </Form.Select>
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
              value={reminder.notes}
              onChange={(e) => setReminder({ ...reminder, notes: e.target.value })}
              required />
          </Form.Group>
        </Col>
      </Row>

    <Row className="justify-content-center">
      <Col xs="auto">
        <div className="d-flex gap-5">
          <Button
            variant="primary"
            type="submit"
            onClick={handleNavigateToReminders}
            style={{ width: "150px", height: "50px", fontSize: "16px" }}
          >
            {mode === "edit" ? "Save Changes" : "Create Reminder"}
          </Button>

          <Button
            variant="danger"
            type="button"
            onClick={handleNavigateToReminders}
            style={{ width: "150px", height: "50px", fontSize: "16px" }}
          >
            Cancel
          </Button>
        </div>
      </Col>
    </Row>
    </Form>
  );
}

export default ReminderForm;
