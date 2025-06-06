import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from "../../assets/Icon1.png";

const DesktopNavLinks = () => {
  return (
    <Nav className="gap-3 align-items-center">
      <Navbar.Brand as={Link} className="text-white" to="/home">
        <img
          src={Icon}
          style={{ width: "100%", maxWidth: "120px", objectFit: "cover" }}
        />
      </Navbar.Brand>{" "}
      <Nav.Link as={Link} className="text-white fw-bold" to="/home">
        Home
      </Nav.Link>
      <Nav.Link as={Link} className="text-white fw-bold" to="/fitness">
        Fitness
      </Nav.Link>

      {/* <NavDropdown
        className="main-nav-dropdown"
        title="Fitness"
        id="nav-fitness"
      > */}
        {/* <NavDropdown.Item as={Link} to="/fitness">
          Fitness
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/fitness-log-workout">
          Log Workout
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/fitness-log-cardio">
          Log Cardio
        </NavDropdown.Item>
      </NavDropdown> */}
      <NavDropdown
        className="main-nav-dropdown"
        title="Nutrition"
        id="nav-nutrition"
      >
        <NavDropdown.Item as={Link} to="/food-diary">
          Food Diary
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/search-meal">
          Search for meals
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/meal-favourites">
          Favourites
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown
        className="main-nav-dropdown"
        title="Performance"
        id="nav-performance"
      >
        <NavDropdown.Item as={Link} to="/steps">
          Steps
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/cardio-vs-workout">
          Cardio vs Workout
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/calorie-burned">
          Calories Burned
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default DesktopNavLinks;
