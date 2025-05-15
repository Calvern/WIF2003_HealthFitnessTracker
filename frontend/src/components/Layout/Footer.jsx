import { Container } from "react-bootstrap";
import Icon from "../../assets/Icon1.png";

const Footer = () => {
  return (
    <div className="w-100 py-3" style={{ backgroundColor: "#0A2239" }}>
      <Container className="d-flex gap-2 flex-column flex-md-row justify-content-between align-items-center">
        <img
                  src={Icon}
                  style={{ width: "100%", maxWidth: "120px", objectFit: "cover" }}
                />
        <span className="d-flex gap-5">
          <span className="text-center text-white">Privacy Policy</span>
          <span className="text-center text-white">Terms of Service</span>
        </span>
      </Container>
    </div>
  );
};

export default Footer;
