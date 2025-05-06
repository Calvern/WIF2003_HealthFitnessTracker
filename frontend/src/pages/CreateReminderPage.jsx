import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

const CreateReminderPage = () => {
  const [validated, setValidated] = useState(false);

  return (
    <>
      <div className="d-flex align-items-center ml-80 mt-5" style={{ fontWeight: "bold", fontSize: "30px" }}>
        <ArrowLeft style={{marginLeft: '40px', marginRight:"40px"}}/>
        Create New Reminder
      </div>
    </>
  )
}

export default CreateReminderPage;