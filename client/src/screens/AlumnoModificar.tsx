import { useState } from "react";
import { Col, Container, Row, FloatingLabel, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import React from "react";
import Swal from 'sweetalert2';
import axios from "axios";

type alumnosEstructura = {
    matricula: string;
    nombre: string;
    APaterno: string;
    MPaterno: string;
    sexo: string;
    Telefono: string;
    CorreoElectrnico: string;
    PerfilFacebook: string;
    Instagram: string;
    TipoSangre: string;
    Contraseña: string;
    dCalle: string;
    Numero: number | string;
    Colonia: string;
    CodigoPostal: number | string;
    dNombreContacto: string;
    TelefonoContacto: string;
}

const initialState: alumnosEstructura = {
    matricula: "",
    nombre: "",
    APaterno: "",
    MPaterno: "",
    sexo: "",
    Telefono: "",
    CorreoElectrnico: "",
    PerfilFacebook: "",
    Instagram: "",
    TipoSangre: "",
    Contraseña: "",
    dCalle: "",
    Numero: "",
    Colonia: "",
    CodigoPostal: "",
    dNombreContacto: "",
    TelefonoContacto: ""
}

function AlumnoModificar() {
    const [alumno, setAlumno] = useState(initialState);
    const [buscarMatricula, setBuscarMatricula] = useState("");

    const handleBuscarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuscarMatricula(e.target.value);
    }

    const buscarAlumno = async () => {
        if (buscarMatricula.trim() === "") {
            Swal.fire("Campo vacío", "Por favor ingresa una matrícula", "warning");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3001/alumnos/getStudent/${buscarMatricula}`);
            console.log(response.data);

            if (response.data && response.data.data) {
                const datos = response.data.data;
                const alumnoData: alumnosEstructura = {
                    matricula: datos.matricula,
                    nombre: datos.nombre,
                    APaterno: datos.APaterno,
                    MPaterno: datos.MPaterno,
                    sexo: String(datos.sexo),
                    Telefono: datos.Telefono,
                    CorreoElectrnico: datos.CorreoElectrnico,
                    PerfilFacebook: datos.PerfilFacebook,
                    Instagram: datos.Instagram,
                    TipoSangre: datos.TipoSangre,
                    Contraseña: datos.Contraseña,
                    dCalle: datos.dCalle,
                    Numero: datos.Numero,
                    Colonia: datos.Colonia,
                    CodigoPostal: datos.CodigoPostal,
                    dNombreContacto: datos.dNombreContacto,
                    TelefonoContacto: datos.TelefonoContacto
                };
                setAlumno(alumnoData);
            } else {
                Swal.fire("No encontrado", "No se encontró ningún alumno con esa matrícula", "error");
                setAlumno(initialState);
            }
        } catch (error) {
            Swal.fire("Error", "No se pudo encontrar el alumno", "error");
            console.error(error);
            setAlumno(initialState);
        }
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target;
        setAlumno({ ...alumno, [name]: value });
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        let { name, value } = event.target;
        setAlumno({ ...alumno, [name]: value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/alumnos/actualizar/${alumno.matricula}`, alumno);
            Swal.fire("Éxito", "Alumno actualizado correctamente", "success");
            setAlumno(initialState);
            setBuscarMatricula("");
        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar el alumno", "error");
            console.error(error);
        }
    }

    const handleCancelar = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No se guardarán los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setAlumno(initialState);
                setBuscarMatricula("");
                Swal.fire('Cancelado', 'Los cambios no se guardaron.', 'info');
            }
        });
    }

    return (
        <Container fluid>
            <h1>Modificar Alumno</h1>

            {/* Buscador de matrícula */}
            <Row className="mb-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <InputGroup>
                        <FormControl
                            placeholder="Buscar matrícula"
                            value={buscarMatricula}
                            onChange={handleBuscarChange}
                        />
                        <Button variant="primary" onClick={buscarAlumno}>
                            Buscar
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            {/* Formulario de edición */}
            <Form onSubmit={handleSubmit}>
                <Row className="mt-3">
                    <Col>
                        <FloatingLabel label="Matricula" className="mb-3">
                            <Form.Control type="text" name="matricula" value={alumno.matricula} disabled />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Nombre" className="mb-3">
                            <Form.Control type="text" name="nombre" value={alumno.nombre} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <FloatingLabel label="Apellido Paterno" className="mb-3">
                            <Form.Control type="text" name="APaterno" value={alumno.APaterno} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Apellido Materno" className="mb-3">
                            <Form.Control type="text" name="MPaterno" value={alumno.MPaterno} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <FloatingLabel label="Sexo" className="mb-3">
                            <Form.Select name="sexo" value={alumno.sexo} onChange={handleSelectChange} required>
                                <option value="">Selecciona una opción</option>
                                <option value="1">Masculino</option>
                                <option value="2">Femenino</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Teléfono" className="mb-3">
                            <Form.Control type="text" name="Telefono" value={alumno.Telefono} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <FloatingLabel label="Correo Electrónico" className="mb-3">
                            <Form.Control type="email" name="CorreoElectrnico" value={alumno.CorreoElectrnico} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Perfil Facebook" className="mb-3">
                            <Form.Control type="text" name="PerfilFacebook" value={alumno.PerfilFacebook} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <FloatingLabel label="Instagram" className="mb-3">
                            <Form.Control type="text" name="Instagram" value={alumno.Instagram} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Tipo Sangre" className="mb-3">
                            <Form.Control type="text" name="TipoSangre" value={alumno.TipoSangre} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <FloatingLabel label="Contraseña" className="mb-3">
                            <Form.Control type="password" name="Contraseña" value={alumno.Contraseña} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                </Row>

                <h5>Dirección</h5>

                <Row className="mt-3">
                    <Col>
                        <FloatingLabel label="Calle" className="mb-3">
                            <Form.Control type="text" name="dCalle" value={alumno.dCalle} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Número" className="mb-3">
                            <Form.Control type="number" name="Numero" value={alumno.Numero} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <FloatingLabel label="Colonia" className="mb-3">
                            <Form.Control type="text" name="Colonia" value={alumno.Colonia} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Código Postal" className="mb-3">
                            <Form.Control type="number" name="CodigoPostal" value={alumno.CodigoPostal} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                </Row>

                <h5>Contacto</h5>

                <Row className="mt-3">
                    <Col>
                        <FloatingLabel label="Nombre Contacto" className="mb-3">
                            <Form.Control type="text" name="dNombreContacto" value={alumno.dNombreContacto} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Teléfono Contacto" className="mb-3">
                            <Form.Control type="text" name="TelefonoContacto" value={alumno.TelefonoContacto} onChange={handleInputChange} required />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="mt-3 text-center">
                    <Col>
                        <Button type="submit" variant="success">Guardar Cambios</Button>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={handleCancelar}>Cancelar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default AlumnoModificar;
