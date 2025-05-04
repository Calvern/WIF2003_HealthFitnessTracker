import { Button } from "react-bootstrap";
import { List } from "react-bootstrap-icons";

const SideBarButton = ({ onClick }) => {
  return (
    <Button
      style={{
        backgroundColor: "transparent",
        color: "white",
        border: "none",
      }}
      onClick={onClick}
      aria-controls="offcanvas-navbar"
    >
      <List size={30} />
    </Button>
  );
};

export default SideBarButton;
