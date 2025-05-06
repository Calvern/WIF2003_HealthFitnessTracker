import React, { useState } from 'react';
import { Form, Button, Row, Col, FormGroup, FormControl, FormLabel, Container } from 'react-bootstrap';
import { ChevronLeft, ChevronDown } from 'react-bootstrap-icons';

const CreateReminderPage = () => {
  const [reminder, setReminder] = useState({
    title: '',
    date: '',
    time: '',
    category: '',
    leadTime: '',
    recurring: '',
    notificationMethod:'',
    notes:''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically submit your reminder data to a server
    // For now, let's just log the reminder to the console
    console.log(reminder);
  };

  return (
    <>
      <div className="d-flex align-items-center ml-5 mt-3 mb-2" style={{ fontWeight: "bold", fontSize: "30px",  marginLeft: '40px'}}>
        <ChevronLeft style={{ marginRight: "4px"}}/>
        Create New Reminder
      </div>
      <Container className="d-flex flex-column vh-100">
      <Form onSubmit={handleSubmit} >
        <Row className="mb-3">
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

        <Row className="mb-3">
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

        <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="formCategory">
                <FormLabel>Category</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Enter category"
                  value={reminder.category}
                  onChange={(e) => setReminder({ ...reminder, category: e.target.value })}
                  required />
              </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group controlId="formLeadTime">
              <FormLabel>Lead Time</FormLabel>
              <FormControl as="select"
                type="select"
                value={reminder.leadTime}
                onChange={(e) => setReminder({ ...reminder, leadTime: e.target.value })}
                required>
                <option value="" disabled>
                    Select lead time 
                </option>
                <option value="5">5 minutes before</option>
                <option value="10">10 minutes before</option>
                <option value="15">15 minutes before</option>
                <option value="20">20 minutes before</option>
              </FormControl>
            </Form.Group>
              </Col>
        </Row>

        <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="formRecurring">
                <FormLabel>Recurring</FormLabel>
                <FormControl as="select"
                  type="select"
                  value={reminder.recurring}
                  onChange={(e) => setReminder({ ...reminder, recurring: e.target.value })}
                  required >
                  <option value="" disabled>
                    Select one 
                </option>
                <option value="Monday">Every Monday</option>
                <option value="Tuesday">Every Tuesday</option>
                <option value="Wednesday">Every Wednesday</option>
                <option value="Thursday">Every Thursday</option>
                <option value="Friday">Every Friday</option>
                <option value="Saturday">Every Saturday</option>
                <option value="Sunday">Every Sunday</option>
                </FormControl>
              </Form.Group>
            </Col>
            <Col md="6">
            <Form.Group controlId="formNotificationMethod">
                <FormLabel>Notification Method</FormLabel>
                <div className='d-flex gap-5 justify-content-between'>
                    <div className="radio-background d-flex align-items-center px-3 rounded">
                        <Form.Check
                        type="radio"
                        label="Email"
                        name="notificationMethod"
                        value="email"
                        checked={reminder.notificationMethod === 'email'}
                        onChange={(e) => setReminder({ ...reminder, notificationMethod: e.target.value })} />
                    </div>
                    <div className="radio-background d-flex align-items-center px-3 rounded">
                        <Form.Check
                        type="radio"
                        label="Browser Notification"
                        name="notificationMethod"
                        value="browser"
                        checked={reminder.notificationMethod === 'browser'}
                        onChange={(e) => setReminder({ ...reminder, notificationMethod: e.target.value })} />  
                    </div>
                    
                </div>
                </Form.Group>

            </Col>
        </Row>
        
        <Row className="mb-3">
          <Col xs="12">
            <Form.Group controlId="formNotes">
              <FormLabel>Notes</FormLabel>
              <FormControl
                as="textarea"
                rows={3}
                placeholder="Enter message"
                value={reminder.message}
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
        type="button"
        onClick={() =>
          setReminder({
            title: '',
            date: '',
            time: '',
            category: '',
            leadTime: '',
            recurring: '',
            notificationMethod: '',
            notes: ''
          })
        }
    style={{ width: "150px", height: "50px", fontSize: "16px" }}>
        Save Reminder
      </Button>
      <Button variant="danger" type="submit" style={{ width: "150px", height: "50px", fontSize: "16px" }}>
        Cancel
      </Button>
    </div>
  </Col>
</Row>

      </Form>
      </Container>
    </>
  );
};

export default CreateReminderPage;