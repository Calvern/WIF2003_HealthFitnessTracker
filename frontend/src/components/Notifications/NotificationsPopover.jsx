import { useState } from "react";
import { Button, Nav, OverlayTrigger, Popover } from "react-bootstrap";
import { Bell, GearFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const NotificationsPopover = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const renderContent = () => {
    if (activeTab === "notifications") {
      return (
        <div>
          <strong>You have 3 new notifications</strong>
          <ul>
            <li>New message from John</li>
            <li>Server maintenance at 10 PM</li>
            <li>Your post was liked</li>
          </ul>
        </div>
      );
    } else if (activeTab === "reminders") {
      return (
        <div>
          <strong>Today's Reminders</strong>
          <ul>
            <li>Team meeting at 2 PM</li>
            <li>Doctor appointment at 5 PM</li>
          </ul>
        </div>
      );
    }
  };
  const popover = (
    <Popover id="popover-basic" style={{ minWidth: "400px" }}>
      <Popover.Header className="d-flex justify-content-between align-items-center bg-white">
        <Nav
          variant="underline"
          defaultActiveKey="notifications"
          className="d-flex flex-row"
          onSelect={(eventKey) => setActiveTab(eventKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="notifications">Notifications</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reminders">Reminders</Nav.Link>
          </Nav.Item>
        </Nav>
        <GearFill />
      </Popover.Header>
      <Popover.Body>{renderContent()}</Popover.Body>
        <div className="popover-footer-link d-flex justify-content-center align-items-center py-2">
          <Link to={activeTab === "notifications" ? "/notifications" : "/reminders"}>
          See All
          </Link>
        </div>      
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom-end"
      overlay={popover}
      rootClose
    >
      <Button style={{ backgroundColor: "transparent", border: "none" }}>
        <Bell color="white" size={30} />
      </Button>
    </OverlayTrigger>
  );
};

export default NotificationsPopover;
