import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from "../../assets/Icon1.png";

const UnauthenticatedNav = () => {
  return (
    <Nav className="flex-row gap-4 me-auto align-items-center">
      <Navbar.Brand as={Link} className="text-white " to="/">
        <img
          src={Icon}
          style={{ width: "100%", maxWidth: "120px", objectFit: "cover" }}
        />
      </Navbar.Brand>
    </Nav>
  );
};

export default UnauthenticatedNav;
