import { useState } from "react";
import { Button, Container, FloatingLabel, Form, Card, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

function AlumnoEliminar() {
    const [matricula, setMatricula] = useState("");
    const [alumno, setAlumno] = useState(null);

    const handleInputChange = (event) => {
        setMatricula(event.target.value);
    };

    const buscarAlumno = async (event) => {
        event.preventDefault();

        if (matricula.trim() === "") {
            Swal.fire("Error", "Ingrese una matrícula válida", "error");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/alumnos/${matricula}`);
            if (response.data && response.data.results && response.data.results.length > 0) {
                setAlumno(response.data.results[0]);
            } else {
                Swal.fire("No encontrado", "No se encontró el alumno", "warning");
                setAlumno(null);
            }
        } catch (error) {
            console.error("Error al buscar el alumno:", error);
            Swal.fire("Error", "Ocurrió un error al buscar el alumno", "error");
            setAlumno(null);
        }
    };

    const eliminarAlumno = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esta acción eliminará el alumno!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:5000/alumnos/eliminar/${matricula}`);
                    Swal.fire("Eliminado", "El alumno ha sido eliminado", "success");
                    setAlumno(null);
                    setMatricula("");
                } catch (error) {
                    console.error("Error al eliminar:", error);
                    Swal.fire("Error", "No se pudo eliminar el alumno", "error");
                }
            }
        });
    };

    const cancelar = () => {
        setAlumno(null);
    };

    return (
        <Container fluid>
            <h1>Eliminar Alumno</h1>
            <Form onSubmit={buscarAlumno}>
                <FloatingLabel label="Matrícula" className="mb-3">
                    <Form.Control type="text" placeholder="Matrícula" value={matricula} onChange={handleInputChange} />
                </FloatingLabel>
                <Button variant="primary" type="submit">Buscar</Button>
            </Form>

            {alumno && (
                <Card className="mt-4">
                    <Card.Body>
                        <Card.Title>Alumno Encontrado</Card.Title>
                        <Row>
                            <Col><strong>Nombre:</strong> {`${alumno.nombre} ${alumno.aPaterno} ${alumno.aMaterno}`}</Col>
                        </Row>
                        <Row>
                            <Col><strong>Teléfono:</strong> {alumno.aTelefono}</Col>
                            <Col><strong>Correo:</strong> {alumno.aCorreo}</Col>
                        </Row>
                        <Row>
                            <Col><strong>Nombre Contacto:</strong> {alumno.nombreContacto}</Col>
                            <Col><strong>Tel. Contacto:</strong> {alumno.telefonoContacto}</Col>
                        </Row>

                        <div className="mt-3 d-flex justify-content-end">
                            <Button variant="danger" className="me-2" onClick={eliminarAlumno}>Eliminar</Button>
                            <Button variant="secondary" onClick={cancelar}>Cancelar</Button>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default AlumnoEliminar;
