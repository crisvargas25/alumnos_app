import { Outlet, Link, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Breadcrumbs() {
  const location = useLocation();
  const breadcrumbMap: Record<string, string> = {
    "/alumnos": "Inicio",
    "/alumnos/agregar": "Agregar Alumno",
    "/alumnos/modificar": "Modificar Alumno",
    "/alumnos/eliminar": "Eliminar Alumno",
    "/alumnos/consultar": "Consultar Alumnos",
  };

  const label = breadcrumbMap[location.pathname] || "Página";

  return (
    <div style={{ margin: "1rem 0", fontWeight: "bold" }}>
      📍 {label}
    </div>
  );
}

function Menu() {
  return (
    <Container fluid>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/alumnos">5A BIS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/alumnos">Home</Nav.Link>
              <NavDropdown title="Alumnos" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/alumnos/agregar">Agregar</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/alumnos/modificar">Modificar</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/alumnos/eliminar">Eliminar</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/alumnos/consultar">Consultar</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Breadcrumbs />
        <Outlet />
      </Container>
    </Container>
  );
}

export default Menu;
