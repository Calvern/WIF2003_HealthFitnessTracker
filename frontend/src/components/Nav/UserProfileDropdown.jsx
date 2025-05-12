import { Button, Dropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const UserProfileDropdown = ({ progress }) => {
  const { setIsLoggedIn } = useAppContext();
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
        <Dropdown.Item as={Button} onClick={() => setIsLoggedIn(false)}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfileDropdown;
