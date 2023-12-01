import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../config/routes";

export default function Navigation() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to={AppRoutes.PostList}>
            Post List
          </Nav.Link>
          <Nav.Link as={Link} to={AppRoutes.Users}>
            User List
          </Nav.Link>
          <Nav.Link as={Link} to={AppRoutes.ToDoList}>
            ToDo List
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
