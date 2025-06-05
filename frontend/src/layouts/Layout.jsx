import { Container } from "react-bootstrap";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-fill">
        <Container  fluid className="p-0">
          {children}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
