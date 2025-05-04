import { Dropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserProfileDropdown = ({ progress }) => {
  return (
    <Dropdown drop="down-centered" align="end">
      <Dropdown.Toggle
        as="div"
        style={{
          padding: 0,
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <Image
          src={progress}
          roundedCircle
          style={{ width: "40px", height: "40px" }}
          alt="Profile"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/profile">
          My Profile
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/settings">
          Settings
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/logout">
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfileDropdown;
