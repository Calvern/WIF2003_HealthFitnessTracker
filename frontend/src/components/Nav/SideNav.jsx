import { useState } from "react";
import { Button, Collapse, Nav, Offcanvas } from "react-bootstrap";
import { CaretDownFill, CaretRightFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const SideNav = ({ showOffcanvas, setShowOffcanvas, isAuthenticated }) => {
  const [openFitness, setOpenFitness] = useState(false);
  const [openNutrition, setOpenNutrition] = useState(false);
  const [openPerformance, setOpenPerformance] = useState(false);
  return (
    <Offcanvas
      show={showOffcanvas}
      onHide={() => setShowOffcanvas(false)}
      placement="start"
      style={{ backgroundColor: "#0A2239" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="text-white">
          React-Bootstrap
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {isAuthenticated && (
          <Nav className="flex-column gap-3">
            <Nav.Link as={Link} className="text-white" to="/home">
              Home
            </Nav.Link>
            <div>
              <Button
                className="w-100 text-white text-start px-3 py-2 d-flex justify-content-between"
                style={{ backgroundColor: "transparent", border: "none" }}
                onClick={() => setOpenFitness((prevState) => !prevState)}
              >
                Fitness{" "}
                <span>
                  {openFitness ? <CaretDownFill /> : <CaretRightFill />}
                </span>
              </Button>
              <Collapse in={openFitness}>
                <div>
                  <Nav className="flex-column px-2">
                    <Nav.Link
                      as={Link}
                      className="side-nav-link"
                      to="/workouts"
                    >
                      Exercise Diary
                    </Nav.Link>
                    <Nav.Link as={Link} className="side-nav-link">
                      Log Steps
                    </Nav.Link>
                    <Nav.Link as={Link} className="side-nav-link">
                      Log Workout
                    </Nav.Link>
                    <Nav.Link as={Link} className="side-nav-link">
                      Log Cardio
                    </Nav.Link>
                  </Nav>
                </div>
              </Collapse>
            </div>

            <div>
              <Button
                className="w-100 text-white text-start px-3 py-2 d-flex justify-content-between"
                style={{ backgroundColor: "transparent", border: "none" }}
                onClick={() => setOpenNutrition((prevState) => !prevState)}
              >
                Nutrition{" "}
                <span>
                  {openNutrition ? <CaretDownFill /> : <CaretRightFill />}
                </span>
              </Button>
              <Collapse in={openNutrition}>
                <div>
                  <Nav className="flex-column px-2">
                    <Nav.Link
                      as={Link}
                      className="side-nav-link"
                      to="/workouts"
                    >
                      Food Diary
                    </Nav.Link>
                    <Nav.Link as={Link} className="side-nav-link">
                      Search for Meals
                    </Nav.Link>
                    <Nav.Link as={Link} className="side-nav-link">
                      Favourites
                    </Nav.Link>
                  </Nav>
                </div>
              </Collapse>
            </div>

            <div>
              <Button
                className="w-100 text-white text-start px-3 py-2 d-flex justify-content-between"
                style={{ backgroundColor: "transparent", border: "none" }}
                onClick={() => setOpenPerformance((prevState) => !prevState)}
              >
                Performance
                <span>
                  {openPerformance ? <CaretDownFill /> : <CaretRightFill />}
                </span>
              </Button>
              <Collapse in={openPerformance}>
                <div>
                  <Nav className="flex-column px-2">
                    <Nav.Link
                      as={Link}
                      className="side-nav-link"
                      to="/workouts"
                    >
                      Steps
                    </Nav.Link>
                    <Nav.Link as={Link} className="side-nav-link">
                      Cardio vs Workout
                    </Nav.Link>
                    <Nav.Link as={Link} className="side-nav-link">
                      Calories Burned
                    </Nav.Link>
                  </Nav>
                </div>
              </Collapse>
            </div>
          </Nav>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideNav;
