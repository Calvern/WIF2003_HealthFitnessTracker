import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const UnauthenticatedNav = () => {
  return (
    <Nav className="flex-row gap-4 me-auto align-items-center">
      <Navbar.Brand as={Link} className="text-white" to="/">
        React-Bootstrap
      </Navbar.Brand>
    </Nav>
  );
};

export default UnauthenticatedNav;
