import { Container } from "react-bootstrap";

const SettingsPage = () => {
  return (
    <Container className="py-5">

      <div className="text-center">Settings Page</div>
      <div className="d-flex justify-content-center align-items-center flex-column gap-3 mt-5">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences.</p>
        <button className="btn btn-primary">Update Settings</button>
      </div>

    </Container>
  )
}

export default SettingsPage;