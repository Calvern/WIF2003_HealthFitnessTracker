import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import SideBarButton from "./SideBarButton";
import UnauthenticatedNav from "./UnauthenticatedNav";
import DesktopNavLinks from "./DesktopNavLinks";
import NotificationsPopover from "../Notifications/NotificationsPopover";
import UserProfileDropdown from "./UserProfileDropdown";
import SideNav from "./SideNav";
import progress from "../../assets/Progress.png";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const MainNavBar = () => {
  const { isLoggedIn } = useAppContext();

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992); // Bootstrap lg breakpoint = 992px
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar
        expand={true}
        className="py-3 sticky-top shadow-sm"
        style={{ backgroundColor: "#0A2239" }}
      >
        <Container>
          {!isLoggedIn ? (
            <UnauthenticatedNav />
          ) : isMobile ? (
            <SideBarButton onClick={() => setShowOffcanvas(true)} />
          ) : (
            <DesktopNavLinks />
          )}

          {isLoggedIn ? (
            <div className="d-flex align-items-center gap-3">
              <NotificationsPopover />
              <UserProfileDropdown progress={progress} />
            </div>
          ) : (
            <Nav className="align-items-center gap-3 ms-auto">
              <Nav.Link
                as={Link}
                className="px-4 py-2 text-white border rounded-5 border-3"
                to="/sign-in"
              >
                Sign In
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="px-4 py-2 text-white border rounded-5 border-3"
                to="/register"
              >
                Register
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>

      <SideNav
        showOffcanvas={showOffcanvas}
        setShowOffcanvas={setShowOffcanvas}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};

export default MainNavBar;
